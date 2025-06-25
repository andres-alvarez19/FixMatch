import LogoHeader from "@/components/LogoHeader";
import { useRouter } from "expo-router";
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
import { Text, TouchableOpacity, View } from "react-native";

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

export default function PlusScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selected) {
      const servicio = servicios.find(s => s.key === selected)?.label || selected;
      router.push({ pathname: "../jobs/NewRequestForm", params: { specialty: servicio } });
    }
  };

  return (
    <View className="flex-1 p-6 pt-0 bg-[#FFFDEB] justify-center items-center">
      {/* Título */}
      <Text className="text-3xl font-bold text-cyan-500 text-center p-0 mt-10 mb-4">
        ¿Qué servicio necesitas?
      </Text>

      {/* Opciones */}
      <View className="flex-row flex-wrap justify-center mb-8">
        {servicios.map((serv, idx) => (
          <TouchableOpacity
            key={serv.key}
            className={`w-[48%] m-[1%] bg-gray-50 rounded-xl p-5 border-2 mb-3 items-center ${selected === serv.key ? "border-2 border-cyan-400" : "border-gray-300"}`}
            onPress={() => setSelected(serv.key)}
            disabled={false}
          >
            {serv.icon}
            <Text className="text-lg font-bold text-center mt-2">{serv.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        className={`w-full rounded-xl py-4 px-8 mx-auto ${selected ? "bg-yellow-300" : "bg-gray-200"}`}
        onPress={handleContinue}
        disabled={!selected}
      >
        <Text className="text-black text-xl font-bold text-center">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}