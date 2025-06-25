import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRegister } from "./RegisterContext";

export default function RegisterPassword() {
  const params = useLocalSearchParams();
  const { updateRegisterData } = useRegister();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formTriedSubmit, setFormTriedSubmit] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!password) newErrors.password = "La contraseña es obligatoria";
    if (!repeatPassword) newErrors.repeatPassword = "Repite la contraseña";
    if (password && repeatPassword && password !== repeatPassword) newErrors.repeatPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setFormTriedSubmit(true);
    if (validate()) {
      updateRegisterData({ password });
      router.push(`./UserTypeForm?nombre=${encodeURIComponent(params.nombre as string)}&email=${encodeURIComponent(params.email as string)}&telefono=${encodeURIComponent(params.telefono as string)}&password=${encodeURIComponent(password)}`);
    }
  };

  useEffect(() => {
    if (formTriedSubmit) validate();
  }, [password, repeatPassword]);

  return (
    <View className="w-full items-center px-4 pt-10 pb-4 mt-10">
      {/* Contraseña */}
      <View className="w-full mb-6">
        <Text className="mb-1 text-base text-black">Contraseña</Text>
        <View className="flex-row items-center border border-cyan-300 rounded-lg bg-white px-3">
          <TextInput
            className="flex-1 py-2"
            placeholder="********"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {formTriedSubmit && errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>}
      </View>
      {/* Repite contraseña */}
      <View className="w-full mb-6">
        <Text className="mb-1 text-base text-black">Repite contraseña</Text>
        <View className="flex-row items-center border border-cyan-300 rounded-lg bg-white px-3">
          <TextInput
            className="flex-1 py-2"
            placeholder="********"
            secureTextEntry={true}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
        </View>
        {formTriedSubmit && errors.repeatPassword && <Text className="text-red-500 text-xs mt-1">{errors.repeatPassword}</Text>}
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