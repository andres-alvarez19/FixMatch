import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface RegisterFormProps {
  showPassword: boolean;
  onShowPassword: () => void;
  showRepeatPassword: boolean;
  onShowRepeatPassword: () => void;
}

export default function RegisterForm({ showPassword, onShowPassword, showRepeatPassword, onShowRepeatPassword }: RegisterFormProps) {
  return (
    <>
      {/* Nombre y Apellido */}
      <View className="flex-row w-full mb-2 space-x-2">
        <View className="flex-1">
          <Text className="mb-1 text-base text-black">Nombre</Text>
          <TextInput
            className="border border-cyan-300 rounded-lg px-3 py-2 bg-white"
            placeholder="nombre"
          />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-base text-black">Apellido</Text>
          <TextInput
            className="border border-cyan-300 rounded-lg px-3 py-2 bg-white"
            placeholder="apellido"
          />
        </View>
      </View>
      {/* Email */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Email</Text>
        <TextInput
          className="border border-cyan-300 rounded-lg px-3 py-2 bg-white"
          placeholder="nombre@email.com"
          keyboardType="email-address"
        />
      </View>
      {/* Teléfono */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Telefono</Text>
        <View className="flex-row items-center border border-cyan-300 rounded-lg bg-white px-3">
          <Text className="mr-2 text-lg">🇨🇱</Text>
          <TextInput
            className="flex-1 py-2"
            placeholder="+569 778459302"
            keyboardType="phone-pad"
          />
        </View>
      </View>
      {/* Contraseña */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Contraseña</Text>
        <View className="flex-row items-center border border-cyan-300 rounded-lg bg-white px-3">
          <TextInput
            className="flex-1 py-2"
            placeholder="******"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={onShowPassword}>
            {showPassword ? (
              <EyeOff size={20} color="#888" />
            ) : (
              <Eye size={20} color="#888" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Repite contraseña */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Repite contraseña</Text>
        <View className="flex-row items-center border border-cyan-300 rounded-lg bg-white px-3">
          <TextInput
            className="flex-1 py-2"
            placeholder="******"
            secureTextEntry={!showRepeatPassword}
          />
          <TouchableOpacity onPress={onShowRepeatPassword}>
            {showRepeatPassword ? (
              <EyeOff size={20} color="#888" />
            ) : (
              <Eye size={20} color="#888" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Botón */}
      <TouchableOpacity 
        className="w-full bg-yellow-300 rounded-lg py-3 mt-4 mb-2"
        onPress={() => router.push('/UserTypeForm')}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Registrar</Text>
      </TouchableOpacity>
    </>
  );
} 