import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker, Region } from "react-native-maps";

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
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'FixMatchApp/1.0 (a.alvarez08@ufromail.cl)',
          'Accept-Language': 'es',
        },
      });
      const data = await res.json();
      setSuggestions(data);
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
    <>
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
          {/* Botón para centrar el mapa */}
          <TouchableOpacity
            className="absolute bg-white rounded-full w-12 h-12 justify-center items-center shadow-md z-20"
            style={{ bottom: 90, right: 30 }}
            onPress={async () => {
              if (location && mapRef.current) {
                const region = {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                };
                mapRef.current.animateToRegion(region, 500);
                setSelectedLocation({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                });
                // Actualizar dirección
                let addr = await Location.reverseGeocodeAsync({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                });
                if (addr.length > 0) {
                  const dir = `${addr[0].street || ""} ${addr[0].name || ""} ${addr[0].city || ""}`.trim();
                  setAddress(dir);
                  setAddressInput(dir);
                }
              }
            }}
          >
            <Ionicons name="locate" size={28} color="#13c6a0" />
          </TouchableOpacity>
          {/* Overlay inferior: botón confirmar */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="absolute left-0 right-0 pb-6 items-center"
            style={{ bottom: 0 }}
          >
            <TouchableOpacity
              className={`w-[90%] rounded-2xl py-4 items-center mb-1 ${isGeocoding ? 'bg-[#f8f7d2]' : 'bg-[#fedf70]'}`}
              onPress={() => {
                if (isGeocoding) return;
                if (userType === "client") {
                  router.push("/register/client/OptionalNewJob");
                } else if (userType === "specialist") {
                  router.push("/register/specialist/SpecialistCategory");
                }
              }}
              disabled={isGeocoding}
            >
              <Text className="text-black text-lg font-bold">Confirmar ubicación</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
} 