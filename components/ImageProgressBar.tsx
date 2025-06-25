import React from 'react';
import { View } from 'react-native';

interface ImageProgressBarProps {
  total: number;
  current: number;
}

const ImageProgressBar: React.FC<ImageProgressBarProps> = ({ total, current }) => {
  return (
    <View className="flex-row w-full px-4 pt-4 absolute top-0 left-0 z-10">
      {Array.from({ length: total }).map((_, idx) => (
        <View
          key={idx}
          className={`flex-1 h-1 mx-0.5 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-400/60'}`}
        />
      ))}
    </View>
  );
};

export default ImageProgressBar; 