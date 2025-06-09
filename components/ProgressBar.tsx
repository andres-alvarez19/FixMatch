import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showLabel?: boolean;
}

export default function ProgressBar({ currentStep, totalSteps, showLabel = false }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(1, currentStep / totalSteps));
  const animated = useRef(new Animated.Value(percent)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: percent,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  return (
    <View className="w-full mb-2">
      <View className="h-2 bg-gray-200 rounded-full w-full overflow-hidden flex-row">
        <Animated.View
          className="h-2 bg-cyan-300 rounded-full"
          style={{ flex: animated, minWidth: percent === 0 ? 0 : 4 }}
        />
        <View
          className="h-2 bg-transparent"
          style={{ flex: 1 - percent }}
        />
      </View>
      {showLabel && (
        <Text className="text-xs text-gray-500 mt-1 text-center">
          Paso {currentStep} de {totalSteps}
        </Text>
      )}
    </View>
  );
} 