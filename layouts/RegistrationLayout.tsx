import { useRouter } from "expo-router";
import React from "react";
import {Text, View} from "react-native";
import LogoHeader from "../components/LogoHeader";
import ProgressHeader from "../components/ProgressHeader";

interface RegistrationLayoutProps {
  currentStep: number;
  totalSteps: number;
  showLogoTitle?: boolean;
  children: React.ReactNode;
}

export default function RegistrationLayout({ currentStep, totalSteps, showLogoTitle = true, children }: RegistrationLayoutProps) {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FFFDEB] px-6 pt-10">
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={() => router.back()}
        showLabel={false}
      />

      <LogoHeader showTitle={showLogoTitle} width={112} height={112} marginBottom={8} />

      {/* Contenido del formulario */}
      {children}
    </View>
  );
} 