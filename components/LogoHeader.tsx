import React from "react";
import { Image, Text, View } from "react-native";

interface LogoHeaderProps {
  showTitle?: boolean;
  width?: number;
  height?: number;
  marginBottom?: number;
}

export default function LogoHeader({ showTitle = true, width = 44, height = 44, marginBottom = 0 }: LogoHeaderProps) {
  return (
    <View className="items-center mt-8" style={{ marginBottom: marginBottom }}>
      <Image
          className="w-{width} h-{height}"
          source={require("../assets/images/Headlineless-logo.png")}
          resizeMode="contain"
      />
      {showTitle && (
        <Text className="text-4xl font-bold text-[#253464] text-center mt-0 pt-0">
            FixMatch
        </Text>
      )}
    </View>
  );
} 