import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import RegistrationLayout from '../../layouts/RegistrationLayout';

const NUM_PHOTOS = 9;

export default function UploadPhotos() {
  const [photos, setPhotos] = useState<(string | null)[]>(Array(NUM_PHOTOS).fill(null));

  const pickImage = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newPhotos = [...photos];
      newPhotos[index] = result.assets[0].uri;
      setPhotos(newPhotos);
    }
  };

  const renderPhotoBox = (item: string | null, index: number) => (
    <View
      key={index}
      className="w-28 h-32 bg-[#E9E9E9] rounded-xl border-2 border-gray-300 m-2 flex justify-center items-center relative"
    >
      {item ? (
        <Image source={{ uri: item }} className="w-full h-full rounded-xl" />
      ) : (
        <TouchableOpacity
          className="absolute bottom-2 right-2 bg-[#FFD600] rounded-full w-10 h-10 justify-center items-center border-2 border-white shadow"
          onPress={() => pickImage(index)}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <RegistrationLayout currentStep={5} totalSteps={6} showLogoTitle={true}>
      <Text className="text-3xl font-bold text-cyan-400 text-center mb-4">Sube fotos de tus trabajos en orden</Text>

      {/* Grid de fotos */}
      <View className="flex-row flex-wrap justify-center mt-2 mb-2">
        {photos.map((item, idx) => renderPhotoBox(item, idx))}
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        className={`w-full rounded-xl py-3 mt-4 ${photos.filter((p) => !!p).length >= 2 ? 'bg-[#FEDF70]' : 'bg-gray-200'}`}
        disabled={photos.filter((p) => !!p).length < 2}
        onPress={() => {/* Aquí puedes manejar el submit */}}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </RegistrationLayout>
  );
} 