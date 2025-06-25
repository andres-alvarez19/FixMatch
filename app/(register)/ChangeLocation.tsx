import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker, Region } from "react-native-maps";
import api from "../../api";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export default function ChangeLocationScreen() {
  const router = useRouter();
  const { userType } = useLocalSearchParams<{ userType: "client" | "specialist" }>();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [addressInput, setAddressInput] = useState<string>("");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setSelectedLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      // Obtener dirección
      let addr = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (addr.length > 0) {
        const dir = `${addr[0].street || ""} ${addr[0].name || ""} ${addr[0].city || ""}`.trim();
        setAddress(dir);
        setAddressInput(dir);
      }
      setLoading(false);
    })();
  }, []);

  // Mover el mapa cuando cambia la ubicación seleccionada
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      const region: Region = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(region, 500);
    }
  }, [selectedLocation]);

  const handleMapPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    // Obtener dirección para la nueva ubicación
    let addr = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (addr.length > 0) {
      const dir = `${addr[0].street || ""} ${addr[0].name || ""} ${addr[0].city || ""}`.trim();
      setAddress(dir);
      setAddressInput(dir);
    }
    setShowSuggestions(false);
  };

  // Autocompletado con Nominatim
  const fetchSuggestions = async (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&addressdetails=1&limit=5&accept-language=es`;
      const res = await api.post(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = res.data;
      setSuggestions(result);
    } catch (e) {
      setSuggestions([]);
    }
  };

  const handleAddressInput = (text: string) => {
    setAddressInput(text);
    setShowSuggestions(true);
    fetchSuggestions(text);
  };

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setAddressInput(suggestion.display_name);
    setAddress(suggestion.display_name);
    setSelectedLocation({
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon),
    });
    setShowSuggestions(false);
  };

  const handleAddressSubmit = async () => {
    if (!addressInput.trim()) return;
    setIsGeocoding(true);
    try {
      const geo = await Location.geocodeAsync(addressInput);
      if (geo.length > 0) {
        setSelectedLocation({
          latitude: geo[0].latitude,
          longitude: geo[0].longitude,
        });
        setAddress(addressInput);
      } else {
        Alert.alert("Dirección no encontrada", "No se pudo encontrar la ubicación para la dirección ingresada.");
      }
    } catch (e) {
      Alert.alert("Error", "Ocurrió un error al buscar la dirección.");
    }
    setIsGeocoding(false);
    setShowSuggestions(false);
  };

  return (
    <View className="flex-1">
      {loading || !location ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#13c6a0" />
        </View>
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <>
                <Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                />
                <Circle
                  center={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                  radius={100}
                  fillColor="rgba(0, 200, 255, 0.2)"
                  strokeColor="rgba(0, 200, 255, 0.5)"
                />
              </>
            )}
          </MapView>
          {/* Overlay superior: barra de dirección y sugerencias */}
          <View className="absolute left-0 right-0 items-center z-10" style={{ top: 40 }}>
            <View className="w-[90%] bg-white rounded-2xl p-3 shadow-md">
              <TextInput
                className="rounded-lg bg-[#F3F3F3] px-3 py-2 text-base text-[#222]"
                style={{ borderWidth: 0 }}
                value={addressInput}
                placeholder="Dirección"
                editable={true}
                onChangeText={handleAddressInput}
                onSubmitEditing={handleAddressSubmit}
                returnKeyType="search"
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && (
                suggestions.length > 0 ? (
                  <FlatList
                    data={suggestions}
                    keyExtractor={item => item.display_name + item.lat + item.lon}
                    className="bg-white rounded-lg mt-1 max-h-44 border border-gray-200"
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="p-2 border-b border-gray-200"
                        onPress={() => handleSuggestionSelect(item)}
                      >
                        <Text className="text-[#222]">{item.display_name}</Text>
                      </TouchableOpacity>
                    )}
                    keyboardShouldPersistTaps="handled"
                  />
                ) : (
                  <View className="bg-white rounded-lg mt-1 p-2 border border-gray-200">
                    <Text className="text-gray-400 text-center">No hay sugerencias</Text>
                  </View>
                )
              )}
            </View>
          </View>
          {/* Overlay inferior: Botón continuar */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={90}
            className="absolute bottom-0 left-0 right-0 bg-transparent px-6 pb-6 pt-2"
          >
            <TouchableOpacity
              className="w-full bg-yellow-300 rounded-lg py-3 shadow-lg"
              disabled={isGeocoding}
              onPress={() => {
                if (userType === "client") {
                  router.push("/client/OptionalNewJob");
                } else if (userType === "specialist") {
                  router.push("/specialist/SpecialistCategory");
                }
              }}
            >
              <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
} 