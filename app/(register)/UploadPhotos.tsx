import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import api from "../../api";

const NUM_PHOTOS = 9;

export default function UploadPhotos() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [photos, setPhotos] = useState<(string | null)[]>(Array(NUM_PHOTOS).fill(null));
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ID recibido por parámetro
  const projectId = params.projectId as string | undefined;
  const solicitudId = params.solicitudId as string | undefined;

  // Cálculo dinámico del ancho de la caja
  const screenWidth = Dimensions.get('window').width;
  // 3 cajas, 4 márgenes horizontales de 8px (mx-1 = 2*4=8px por caja, 4*8=32px total)
  const box32 = 128 * 3 + 32; // w-32 = 128px
  const useW32 = screenWidth >= box32;
  const boxWidth = useW32 ? 128 : 112; // 128=w-32, 112=w-28
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

  const handleUploadPhotos = async () => {
    setCargando(true);
    setError(null);
    try {
      let formData = new FormData();
      let url = '';
      if (projectId) {
        formData.append('projectId', projectId);
        url = '/api/proyectos/fotos';
      } else if (solicitudId) {
        formData.append('solicitudId', solicitudId);
        url = '/api/solicitudes/fotos';
      } else {
        throw new Error('No se recibió un ID válido para subir las fotos');
      }
      // Convertir las URIs a objetos tipo File para FormData
      const files = photos.filter(Boolean).map((uri, idx) => ({
        uri,
        name: `foto_${idx}.jpg`,
        type: 'image/jpeg',
      }));
      files.forEach((file) => {
        // @ts-ignore
        formData.append('fotos', file);
      });
      // Subir fotos a la API
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.ok) throw new Error('Error al subir las fotos');
      router.push('./RegisterLoading');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View className="flex-1 p-6 pt-0 bg-[#FFFDEB]">
      
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-4 mb-4">
        Sube fotos de tus trabajos
      </Text>

      {/* Grid de fotos */}
      <View className="flex-row flex-wrap justify-center mt-2 mb-2 w-full ">
        {photos.map((item, idx) => renderPhotoBox(item, idx))}
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        className={`w-full rounded-xl py-3 mt-4 ${photos.filter((p) => !!p).length >= 2 ? 'bg-[#FEDF70]' : 'bg-gray-200'}`}
        disabled={photos.filter((p) => !!p).length < 2 || cargando}
        onPress={handleUploadPhotos}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">{cargando ? "Subiendo..." : "Continuar"}</Text>
      </TouchableOpacity>
      {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}
    </View>
  );
} 