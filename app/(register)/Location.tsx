import LogoHeader from "@/components/LogoHeader";
import { useRegistrarUsuario } from "@/hooks/useRegistrarUsuario";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { useUser } from '../../contexts/UserContext';
import { useRegister } from "./RegisterContext";

export default function ConfirmLocationScreen() {
  const router = useRouter();
  const { userType } = useLocalSearchParams<{ userType: "client" | "specialist" }>();
  const { registerData, updateRegisterData } = useRegister();
  const { registrarUsuario, loading: loadingUsuario, error: errorUsuario } = useRegistrarUsuario();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();

  const getDescription = () => {
    if (userType === "client") {
      return "Necesitamos la ubacion donde necesitas el trabajo para buscar especialistas";
    } else {
      return "Necesitamos la ubacion para buscar clientes en tu zona";
    }
  };

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
        const fullAddress = `${addr[0].street || ""} ${addr[0].name || ""} ${addr[0].city || ""}`.trim();
        setAddress(fullAddress);
        updateRegisterData({ ubicacion: fullAddress });
      }
      setLoading(false);
    })();
  }, []);

  return (
    <View className="flex-1 p-6 bg-[#FFFDEB]">
      <LogoHeader showTitle={true} height={60} width={60} />
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-4 mb-2">
        ¿Es correcta tu ubicacion?
      </Text>
      <Text className="text-center text-base text-black mb-2 font-semibold">
        {getDescription()}
      </Text>

      {/* Mapa */}
      <View className="border-2 border-cyan-400 rounded-xl overflow-hidden mb-2" style={{ height: 320 }}>
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
        {/* Dirección */}
        <TextInput
          className="px-3 py-2 bg-white overflow-hidden rounded-lg border border-gray-300"
          value={address}
          placeholder="Dirección"
          editable={false}
        />
      </View>

      {/* Botones */}
      <TouchableOpacity 
        className="w-full bg-yellow-300 rounded-lg py-3 mb-2"
        onPress={async () => {
          // Enviar usuario a la API y guardar el ID
          const id = await registrarUsuario(registerData);
          if (id) {
            updateRegisterData({ id });
            setUser({ ...registerData, id });
            if (userType === "client") {
              router.push("/(register)/client/OptionalNewJob");
            } else if (userType === "specialist") {
              router.push("/(register)/specialist/SpecialistCategory");
            }
          }
        }}
        disabled={loadingUsuario}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">{loadingUsuario ? "Enviando..." : "Continuar"}</Text>
      </TouchableOpacity>
      {errorUsuario && <Text className="text-red-500 text-center mb-2">{errorUsuario}</Text>}
      <TouchableOpacity 
        className="w-full bg-gray-200 rounded-lg py-3"
        onPress={() => {
          router.push({
            pathname: "/(register)/ChangeLocation",
            params: { userType }
          });
        }}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Elegir otra ubicacion</Text>
      </TouchableOpacity>
    </View>
  );
}