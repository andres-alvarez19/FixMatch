import LogoHeader from "@/components/LogoHeader";
import { useRegistrarUsuario } from "@/hooks/useRegistrarUsuario";
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
import { Text, TouchableOpacity, View } from "react-native";
import { useUser } from '../../../contexts/UserContext';
import { useRegister } from "../RegisterContext";

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
  const { registerData, updateRegisterData } = useRegister();
  const { registrarUsuario, loading: loadingUsuario, error: errorUsuario } = useRegistrarUsuario();
  const [selected, setSelected] = useState<string[]>(registerData.especialista.servicios || []);
  const { setUser } = useUser();

  const toggleServicio = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <View className="flex-1 p-6 pt-0 bg-[#FFFDEB]">
      <LogoHeader showTitle={true} height={60} width={60} />
      {/* Título */}
      <Text className="text-3xl font-bold text-cyan-500 text-center p-0 mt-4 mb-4">
        ¿Que servicios ofreces?
      </Text>

      {/* Opciones */}
      <View className="flex-row flex-wrap justify-center mb-8">
        {servicios.map((serv, idx) => (
          <TouchableOpacity
            key={serv.key}
            className={`w-[48%] m-[1%] bg-gray-50 rounded-xl p-5 border-2 mb-3 items-center ${
              selected.includes(serv.key) ? "border-2 border-cyan-400" : "border-gray-300"
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
        className={`w-full rounded-lg py-3 mt-0 ${
          selected.length === 0 ? "bg-gray-200" : "bg-yellow-300"
        }`}
        disabled={selected.length === 0 || loadingUsuario}
        onPress={async () => {
          if (selected.length > 0) {
            updateRegisterData({ especialista: { servicios: selected } });
            // Enviar usuario a la API y guardar el ID
            const id = await registrarUsuario({ ...registerData, especialista: { ...registerData.especialista, servicios: selected } });
            if (id) {
              updateRegisterData({ id });
              setUser(id, 'especialista');
              router.push({ pathname: "./JobRegisterForm", params: { jobTypes: JSON.stringify(selected) } });
            }
          }
        }}
      >
        <Text
          className={`text-center text-lg font-medium ${
            selected.length === 0 ? "text-gray-500" : "text-[#1A2341]"
          }`}
        >
          {loadingUsuario ? "Enviando..." : "Continuar"}
        </Text>
      </TouchableOpacity>
      {errorUsuario && <Text className="text-red-500 text-center mb-2">{errorUsuario}</Text>}
    </View>
  );
}