import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

export default function ConfirmLocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Obtener dirección
      let addr = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (addr.length > 0) {
        setAddress(
          `${addr[0].street || ""} ${addr[0].name || ""} ${addr[0].city || ""}`.trim()
        );
      }
      setLoading(false);
    })();
  }, []);

  return (
    <View className="flex-1 bg-[#FFFDEB] px-6 pt-10">
      {/* Barra de progreso y back */}
      <View className="flex-row items-center mb-2">
        <TouchableOpacity>
          <Text className="text-2xl text-gray-400 mr-2">{"<"}</Text>
        </TouchableOpacity>
        <View className="flex-1 h-1 bg-cyan-300 rounded-full" />
      </View>

      {/* Logo */}
      <View className="items-center mb-2">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-28 h-28 mb-2"
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text className="text-3xl font-bold text-[#1A2341] text-center">FixMatch</Text>
      <Text className="text-xl font-bold text-cyan-500 text-center mt-1 mb-2">
        ¿Es correcta tu ubicacion?
      </Text>
      <Text className="text-center text-base text-black mb-2 font-semibold">
        Necesitamos la ubicacion para buscar clientes en tu zona
      </Text>

      {/* Mapa */}
      <View className="border-2 border-cyan-400 rounded-xl overflow-hidden mb-2" style={{ height: 220 }}>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#13c6a0" />
          </View>
        ) : location ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            pointerEvents="none"
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
            <Circle
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              radius={100}
              fillColor="rgba(0, 200, 255, 0.2)"
              strokeColor="rgba(0, 200, 255, 0.5)"
            />
          </MapView>
        ) : (
          <Text className="text-center text-gray-500 mt-10">No se pudo obtener la ubicación</Text>
        )}
      </View>

      {/* Dirección */}
      <TextInput
        className="border border-cyan-400 rounded-lg px-3 py-2 bg-white mb-4"
        value={address}
        placeholder="Dirección"
        editable={false}
      />

      {/* Botones */}
      <TouchableOpacity className="w-full bg-yellow-300 rounded-lg py-3 mb-2">
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-gray-200 rounded-lg py-3">
        <Text className="text-center text-lg text-[#1A2341] font-medium">Elegir otra ubicacion</Text>
      </TouchableOpacity>
    </View>
  );
}