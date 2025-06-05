import { router } from "expo-router";
import { Users, Wrench } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UserTypeScreen() {
  const [selected, setSelected] = useState<"cliente" | "especialista" | null>("cliente");

  return (
    <View className="flex-1 bg-[#FFFDEB] px-6 pt-10">
      {/* Barra de progreso y back */}
      <View className="flex-row items-center mb-2">
        <View className="flex-1 h-1 bg-cyan-300 rounded-full" />
      </View>
    <TouchableOpacity>
        <Text className="text-2xl text-gray-400 mr-2">{"<"}</Text>
    </TouchableOpacity>

      {/* Logo */}
      <View className="items-center mb-2">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-44 h-44 mb-2"
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text className="text-xl font-bold text-cyan-500 text-center mt-1 mb-2">
        ¿Cómo quieres usar FixMatch?
      </Text>
      <Text className="text-center text-base text-gray-700 mb-6">
        Elige si deseas buscar ayuda para tu hogar{"\n"}
        o si quieres ofrecer tus servicios como especialista.
      </Text>

      {/* Opciones */}
      <View className="flex-row justify-center mb-8 space-x-4">
        {/* Cliente */}
        <TouchableOpacity
          className={`flex-1 bg-gray-50 rounded-xl p-5 border ${selected === "cliente" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => {
            setSelected("cliente");
          }}
        >
          <View className="items-center mb-2">
            <Users size={36} color="#222" />
          </View>
          <Text className="text-lg font-bold text-center mb-1">Cliente</Text>
          <Text className="text-center text-gray-600 text-sm">
            Necesito ayuda con un problema en mi hogar
          </Text>
        </TouchableOpacity>
        {/* Especialista */}
        <TouchableOpacity
          className={`flex-1 bg-gray-50 rounded-xl p-5 border ${selected === "especialista" ? "border-cyan-400" : "border-gray-200"}`}
          onPress={() => setSelected("especialista")}
        >
          <View className="items-center mb-2">
            <Wrench size={36} color="#222" />
          </View>
          <Text className="text-lg font-bold text-center mb-1">Especialista</Text>
          <Text className="text-center text-gray-600 text-sm">
            Ofrezco servicios y quiero encontrar nuevos clientes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        className="w-full bg-yellow-300 rounded-lg py-3 mt-2"
        disabled={!selected}
        onPress={() => {
          if (selected === "cliente") {
            router.push("/OptionalNewJob");
          } else if (selected === "especialista") {
            router.push("/SpecialistCategory");
          }
        }}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}