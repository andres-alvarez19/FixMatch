import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <View className="flex-1 bg-[#FFFDEB] items-center justify-center px-6">
      {/* Logo */}
        <View className="rounded-full p-2 mb-2">
            <Image
                source={require("../assets/images/logo.png")}
                className="w-48 h-48"
                resizeMode="contain"
            />
        </View>

      {/* Tabs */}
      <View className="flex-row w-full mb-4">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-l-lg ${activeTab === "login" ? "bg-cyan-400" : "bg-gray-100"}`}
          onPress={() => setActiveTab("login")}
        >
          <Text className={`text-center ${activeTab === "login" ? "text-white" : "text-gray-500"}`}>Iniciar sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-r-lg ${activeTab === "register" ? "bg-cyan-400" : "bg-gray-100"}`}
          onPress={() => setActiveTab("register")}
        >
          <Text className={`text-center ${activeTab === "register" ? "text-white" : "text-gray-500"}`}>Registro</Text>
        </TouchableOpacity>
      </View>

      {/* Formulario dinámico */}
      {activeTab === "login" ? (
        <LoginForm
          showPassword={showPassword}
          onShowPassword={() => setShowPassword(!showPassword)}
        />
      ) : (
        <RegisterForm
          showPassword={showPassword}
          onShowPassword={() => setShowPassword(!showPassword)}
          showRepeatPassword={showRepeatPassword}
          onShowRepeatPassword={() => setShowRepeatPassword(!showRepeatPassword)}
        />
      )}
    </View>
  );
}