import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useRegister } from "../(register)/RegisterContext";
import { useEmailValidation } from "../../hooks/useEmailValidation";

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
  const { updateRegisterData } = useRegister();
  const { validateEmail, validateEmailOnChange, isCheckingEmail, emailError, clearEmailError } = useEmailValidation();

  const validate = async () => {
    const newErrors: any = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre completo es obligatorio";
    
    // Validación de email usando el hook personalizado
    const isEmailValid = await validateEmail(email);
    if (!isEmailValid) {
      newErrors.email = emailError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    setFormTriedSubmit(true);
    const isValid = await validate();
    if (isValid) {
      updateRegisterData({ nombre, email });
      router.push({
        pathname: "/(register)/RegisterPhone",
        params: { nombre, email },
      });
    }
  };

  useEffect(() => {
    if (formTriedSubmit) {
      validate();
    }
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
        <View className="relative">
          <TextInput
            className="border border-cyan-300 rounded-lg px-3 py-2 bg-white pr-10"
            placeholder="ejemplo@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmailOnChange(text);
            }}
          />
          {isCheckingEmail && (
            <View className="absolute right-3 top-2">
              <ActivityIndicator size="small" color="#1A2341" />
            </View>
          )}
        </View>
        {(formTriedSubmit && errors.email) || emailError ? (
          <Text className="text-red-500 text-xs mt-1">{errors.email || emailError}</Text>
        ) : null}
      </View>
      {/* Botón */}
      <TouchableOpacity 
        className={`w-full rounded-lg py-3 mt-4 mb-2 ${(formTriedSubmit && Object.keys(errors).length > 0) || isCheckingEmail ? 'bg-gray-200' : 'bg-yellow-300'}`}
        onPress={handleContinue}
        disabled={(formTriedSubmit && Object.keys(errors).length > 0) || isCheckingEmail}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">
          {isCheckingEmail ? 'Verificando...' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
} 