import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface RegisterFormProps {
  showPassword: boolean;
  onShowPassword: () => void;
  showRepeatPassword: boolean;
  onShowRepeatPassword: () => void;
}

export default function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formTriedSubmit, setFormTriedSubmit] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre completo es obligatorio";
    if (!email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "El email debe ser válido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setFormTriedSubmit(true);
    if (validate()) {
      router.push('./RegisterPhone?nombre=' + encodeURIComponent(nombre) + '&email=' + encodeURIComponent(email));
    }
  };

  useEffect(() => {
    if (formTriedSubmit) validate();
  }, [nombre, email]);

  return (
    <View className="w-full items-center">
      {/* Nombre */}
      <View className="w-full mb-2 mx-2">
        <Text className="mb-1 text-base text-black">Nombre completo</Text>
        <TextInput
          className="border border-cyan-300 rounded-lg px-3 py-2 bg-white"
          placeholder="Ej: Joaquin Alexis Anabalon Marin"
          value={nombre}
          onChangeText={setNombre}
        />
        {formTriedSubmit && errors.nombre && <Text className="text-red-500 text-xs mt-1">{errors.nombre}</Text>}
      </View>
      {/* Email */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Email</Text>
        <TextInput
          className="border border-cyan-300 rounded-lg px-3 py-2 bg-white"
          placeholder="ejemplo@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {formTriedSubmit && errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
      </View>
      {/* Botón */}
      <TouchableOpacity 
        className={`w-full rounded-lg py-3 mt-4 mb-2 ${(formTriedSubmit && Object.keys(errors).length > 0) ? 'bg-gray-200' : 'bg-yellow-300'}`}
        onPress={handleContinue}
        disabled={formTriedSubmit && Object.keys(errors).length > 0}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
} 