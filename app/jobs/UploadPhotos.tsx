import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import api from "../../api";

const NUM_PHOTOS = 9;

export default function UploadPhotos() {
  const [photos, setPhotos] = useState<(string | null)[]>(Array(NUM_PHOTOS).fill(null));
  const router = useRouter();
  const params = useLocalSearchParams();
  const solicitudId = params.solicitudId as string;

  // Cálculo dinámico del ancho de la caja
  const screenWidth = Dimensions.get('window').width;
  const box32 = 128 * 3 + 32;
  const useW32 = screenWidth >= box32;
  const boxWidth = useW32 ? 128 : 112;
  const boxClass = useW32 ? 'w-32' : 'w-28';

  const pickImage = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
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
      className={`${boxClass} h-44 bg-[#E9E9E9] rounded-xl border-2 border-gray-300 mx-1 my-2 flex justify-center items-center relative`}
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

  const handleUpload = async () => {
    for (const photo of photos.filter(Boolean)) {
      const formData = new FormData();
      formData.append("solicitudId", solicitudId);
      formData.append("foto", {
        uri: photo,
        name: "foto.jpg",
        type: "image/jpeg",
      } as any);
      await api.post("/api/solicitudes/upload-foto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    router.push("./RequestSuccess");
  };

  return (
    <View className="flex-1 px-6 pt-12 bg-[#FFFDEB]">
      {/* Header */}
      <View className="h-16 flex-row items-center justify-start mb-20">
        <TouchableOpacity
            onPress={() => router.back()}
        >
            <Ionicons name="chevron-back" size={28} color="#888" />
        </TouchableOpacity>
      </View>
      
      {/* Título */}
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-20 mb-4">
        Sube fotos de tu problema
      </Text>
      {/* Grid de fotos */}
      <View className="flex-row flex-wrap justify-center mt-2 mb-2 w-full ">
        {photos.map((item, idx) => renderPhotoBox(item, idx))}
      </View>
      {/* Botón continuar */}
      <TouchableOpacity
        className={`w-full rounded-xl py-3 mt-4 ${photos.filter((p) => !!p).length >= 3 ? 'bg-[#FEDF70]' : 'bg-gray-200'}`}
        disabled={photos.filter((p) => !!p).length < 3}
        onPress={handleUpload}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
} 