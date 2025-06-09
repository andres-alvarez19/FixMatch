import { useRouter } from "expo-router";
import { Users, Wrench } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RegistrationLayout from "../../../layouts/RegistrationLayout";

export default function ClienteSolicitudScreen() {
  const [selected, setSelected] = useState<"ahora" | "luego" | null>("ahora");
  const router = useRouter();

  return (
    <RegistrationLayout currentStep={3} totalSteps={6}>
        <Text className="text-3xl font-bold text-cyan-500 text-center mt-0 mb-4">
            Clientes
        </Text>
      {/* Opciones */}
      <View className="mb-8">
        {/* Crear ahora */}
        <TouchableOpacity
          className={`bg-gray-50 rounded-xl p-6 border mb-4 flex-row items-center justify-center ${selected === "ahora" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => {
            setSelected("ahora")
          }}
        >
          <Users size={28} color="#222" className="mr-2" />
          <Text className="text-lg font-bold text-center ml-2">Crear una solicitud ahora</Text>
        </TouchableOpacity>
        {/* Crear más tarde */}
        <TouchableOpacity
          className={`bg-gray-50 rounded-xl p-6 border flex-row items-center justify-center ${selected === "luego" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => setSelected("luego")}
        >
          <Wrench size={28} color="#222" className="mr-2" />
          <Text className="text-lg font-bold text-center ml-2">Crearla mas tarde</Text>
        </TouchableOpacity>
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        className="w-full bg-yellow-300 rounded-lg py-3 mt-2"
        disabled={!selected}
        onPress={() => {
          if (selected === "ahora") {
            router.push("/register/client/RequestForm");
          } else if (selected === "luego") {
          }
        }}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </RegistrationLayout>
  );
}