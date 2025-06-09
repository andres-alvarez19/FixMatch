import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { TouchableOpacity, View } from "react-native";
import ProgressBar from "./ProgressBar";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  showLabel?: boolean;
}

export default function ProgressHeader({ currentStep, totalSteps, onBack, showLabel = false }: ProgressHeaderProps) {
  return (
    <View className="mb-2 pt-2">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} showLabel={showLabel} />
      <TouchableOpacity
        className="left-0 top-1/2 -translate-y-1/2"
        onPress={onBack}
      >
        <Ionicons name="chevron-back" size={28} color="#888" />
      </TouchableOpacity>
    </View>
  );
} 