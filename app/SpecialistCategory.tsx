import { router } from "expo-router";
import {
    Car,
    Construction,
    Droplets,
    Hammer,
    Paintbrush,
    Sparkles,
    Wrench,
    Zap
} from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const servicios = [
  { key: "plomeria", label: "Plomería", icon: <Droplets size={28} color="#222" /> },
  { key: "mecanico", label: "Mecánico", icon: <Car size={28} color="#222" /> },
  { key: "pintor", label: "Pintor", icon: <Paintbrush size={28} color="#222" /> },
  { key: "gasfiter", label: "Gasfiter", icon: <Wrench size={28} color="#222" /> },
  { key: "limpieza", label: "Limpieza", icon: <Sparkles size={28} color="#222" /> },
  { key: "electricidad", label: "Electricidad", icon: <Zap size={28} color="#222" /> },
  { key: "construccion", label: "Construcción", icon: <Construction size={28} color="#222" /> },
  { key: "carpinteria", label: "Carpintería", icon: <Hammer size={28} color="#222" /> },
];

export default function ServiciosScreen() {
  const [selected, setSelected] = useState<string[]>(["plomeria", "gasfiter"]);

  const toggleServicio = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

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
          source={require("../assets/images/Headlineless-logo.png")}
          className="w-28 h-28 mb-2"
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text className="text-3xl font-bold text-[#1A2341] text-center">FixMatch</Text>
      <Text className="text-xl font-bold text-cyan-500 text-center mt-1 mb-6">
        ¿Que servicios ofreces?
      </Text>

      {/* Opciones */}
      <View className="flex-row flex-wrap justify-center mb-8">
        {servicios.map((serv, idx) => (
          <TouchableOpacity
            key={serv.key}
            className={`w-[48%] m-[1%] bg-gray-50 rounded-xl p-5 border mb-3 items-center ${
              selected.includes(serv.key) ? "border-cyan-400" : "border-gray-300"
            }`}
            onPress={() => toggleServicio(serv.key)}
          >
            {serv.icon}
            <Text className="text-lg font-bold text-center mt-2">{serv.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        className="w-full bg-yellow-300 rounded-lg py-3 mt-2"
        disabled={selected.length === 0}
        onPress={() => {
          if (selected.length > 0) {
            router.push("/Location");
          }
        }}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}