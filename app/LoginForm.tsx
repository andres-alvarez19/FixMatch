import { Eye, EyeOff } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface LoginFormProps {
  showPassword: boolean;
  onShowPassword: () => void;
}

export default function LoginForm({ showPassword, onShowPassword }: LoginFormProps) {
  return (
    <>
      {/* Email */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Email</Text>
        <TextInput
          className="border border-cyan-300 rounded-lg px-3 py-2 bg-white"
          placeholder="nombre@email.com"
          keyboardType="email-address"
        />
      </View>
      {/* Password */}
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
      {/* Botón */}
      <TouchableOpacity className="w-full bg-yellow-300 rounded-lg py-3 mt-4 mb-2">
        <Text className="text-center text-lg text-[#1A2341] font-medium">Iniciar sesion</Text>
      </TouchableOpacity>
      {/* Olvidé contraseña */}
      <TouchableOpacity>
        <Text className="text-center text-black font-semibold mt-2">Olvide la contraseña</Text>
      </TouchableOpacity>
    </>
  );
} 