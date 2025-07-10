import LogoHeader from "@/components/LogoHeader";
import { router } from "expo-router";
import { Users, Wrench } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRegister } from "./RegisterContext";

export default function UserTypeScreen() {
  const [selected, setSelected] = useState<"client" | "specialist" | null>("client");
  const { updateRegisterData } = useRegister();

  return (
    <View className="flex-1 p-6 bg-[#FFFDEB]">
      <LogoHeader showTitle={true} height={60} width={60} />
      {/* Título */}
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-4 mb-2">
        ¿Cómo quieres usar FixMatch?
      </Text>
      <Text className="text-center text-base text-gray-700 mb-6">
        Elige si deseas buscar ayuda para tu hogar{"\n"}
        o si quieres ofrecer tus servicios como specialist.
      </Text>

      {/* Opciones */}
      <View className="flex-row justify-center mb-8 space-x-4">
        {/* Cliente */}
        <TouchableOpacity
          className={`flex-1 bg-gray-50 rounded-xl p-2 border-2 mx-2 py-20 ${selected === "client" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => setSelected("client")}
        >
          <View className="items-center mb-2">
            <Users size={36} color="#222" />
          </View>
          <Text className="text-xl font-bold text-center mb-1">Cliente</Text>
          <Text className="text-center text-gray-600 text-sm">
            Necesito ayuda con un problema en mi hogar
          </Text>
        </TouchableOpacity>
        {/* specialist */}
        <TouchableOpacity
          className={`flex-1 bg-gray-50 rounded-xl p-2 border-2 mx-2 py-20  ${selected === "specialist" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => setSelected("specialist")}
        >
          <View className="items-center mb-2">
            <Wrench size={36} color="#222" />
          </View>
          <Text className="text-xl font-bold text-center mb-1">Especialista</Text>
          <Text className="text-center text-gray-600 text-sm">
            Ofrezco servicios y quiero encontrar nuevos clientes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        className="w-full bg-yellow-300 rounded-lg py-3 mt-8"
        disabled={!selected}
        onPress={() => {
          if (!selected) return; // Guarda de seguridad
          updateRegisterData({ tipoUsuario: selected });
          router.push({
            pathname: "/(register)/Location",
            params: { userType: selected }
          });
        }}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}