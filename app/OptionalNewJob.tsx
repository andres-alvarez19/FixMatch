import { Users, Wrench } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ClienteSolicitudScreen() {
  const [selected, setSelected] = useState<"ahora" | "luego" | null>("ahora");

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
          source={require("../assets/images/logo-client.png")}
          className="w-40 h-40"
          resizeMode="contain"
        />
      </View>

      {/* Opciones */}
      <View className="mb-8">
        {/* Crear ahora */}
        <TouchableOpacity
          className={`bg-gray-50 rounded-xl p-6 border mb-4 flex-row items-center justify-center ${selected === "ahora" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => setSelected("ahora")}
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
        // onPress={() => ...}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}