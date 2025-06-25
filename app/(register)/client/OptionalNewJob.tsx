import LogoHeader from "@/components/LogoHeader";
import { useRouter } from "expo-router";
import { Clock, Wrench } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ClienteSolicitudScreen() {
  const [selected, setSelected] = useState<"ahora" | "luego" | null>("ahora");
  const router = useRouter();

  return (
    <View className="flex-1 p-6 bg-[#FFFDEB]">
      <LogoHeader showTitle={true} height={60} width={60} />
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-4 mb-4">
        ¿Deseas crear tu primera solicitud?
      </Text>
      {/* Opciones */}
      <View className="mb-8">
        {/* Crear ahora */}
        <TouchableOpacity
          className={`bg-gray-50 rounded-xl p-6 border-2 mb-4 flex-col items-center justify-center ${selected === "ahora" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => setSelected("ahora")}
        >
          <Wrench size={28} color="#222" className="mr-2" />
          <Text className="text-xl font-bold text-center ml-2">Crear una solicitud ahora</Text>
        </TouchableOpacity>
        {/* Crear más tarde */}
        <TouchableOpacity
          className={`bg-gray-50 rounded-xl p-6 border-2 flex-col items-center justify-center ${selected === "luego" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => setSelected("luego")}
        >
          <Clock size={28} color="#222" className="mr-2" />
          <Text className="text-xl font-bold text-center ml-2">Crearla mas tarde</Text>
        </TouchableOpacity>
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        className="w-full bg-yellow-300 rounded-lg py-3 mt-8"
        disabled={!selected}
        onPress={() => {
          if (selected === "ahora") {
            router.push("./RequestForm");
          } else if (selected === "luego") {
            router.replace('../../(tabs)/home');
          }
        }}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}