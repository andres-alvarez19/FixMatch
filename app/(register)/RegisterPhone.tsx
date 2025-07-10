import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRegister } from "./RegisterContext";

export default function RegisterPhone() {
  const params = useLocalSearchParams();
  const { updateRegisterData } = useRegister();
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formTriedSubmit, setFormTriedSubmit] = useState(false);

  useEffect(() => {
    const { nombre, email } = params;
    if (nombre && email) {
      updateRegisterData({ nombre, email });
    }
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!telefono.trim()) newErrors.telefono = "El teléfono es obligatorio";
    else if (!/^\d{9}$/.test(telefono.replace(/\D/g, ""))) newErrors.telefono = "El teléfono debe tener 9 dígitos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setFormTriedSubmit(true);
    if (validate()) {
      updateRegisterData({ telefono });
      router.push(`./RegisterPassword`);
    }
  };

  useEffect(() => {
    if (formTriedSubmit) validate();
  }, [telefono]);

  return (
    <View className="w-full items-center px-4 pt-10 pb-4 mt-10">
      {/* Teléfono */}
      <View className="w-full mb-6">
        <Text className="mb-1 text-base text-black">Teléfono</Text>
        <View className="flex-row items-center border border-cyan-300 rounded-lg bg-white px-3">
          <Text className="mr-2 text-lg">🇨🇱</Text>
          <TextInput
            className="flex-1 py-2"
            placeholder="9 778459302"
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
            maxLength={10}
          />
        </View>
        {formTriedSubmit && errors.telefono && <Text className="text-red-500 text-xs mt-1">{errors.telefono}</Text>}
      </View>
      {/* Botón */}
      <TouchableOpacity
        className={`w-full rounded-lg py-3 mt-2 mb-2 ${(formTriedSubmit && Object.keys(errors).length > 0) ? 'bg-gray-200' : 'bg-yellow-300'}`}
        onPress={handleContinue}
        disabled={formTriedSubmit && Object.keys(errors).length > 0}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
} 