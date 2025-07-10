import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import api from "../../api";

const NUM_PHOTOS = 9;

export default function UploadPhotos() {
  const [photos, setPhotos] = useState<(string | null)[]>(Array(NUM_PHOTOS).fill(null));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const solicitudId = params.solicitudId as string;

  // Debug: Verificar token al montar el componente
  React.useEffect(() => {
    const authHeader = api.defaults.headers.common['Authorization'];
    console.log('UploadPhotos - Token al montar:', authHeader ? 'Presente' : 'Ausente');
  }, []);

  // Función para comprimir imagen
  const compressImage = async (uri: string): Promise<string> => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // Reducir ancho a 800px
        {
          compress: 0.3, // Compresión adicional
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      console.log('Imagen comprimida:', result.uri);
      return result.uri;
    } catch (error) {
      console.error('Error comprimiendo imagen:', error);
      return uri; // Retornar original si falla la compresión
    }
  };

  // Cálculo dinámico del ancho de la caja
  const screenWidth = Dimensions.get('window').width;
  const box32 = 128 * 3 + 32;
  const useW32 = screenWidth >= box32;
  const boxWidth = useW32 ? 128 : 112;
  const boxClass = useW32 ? 'w-32' : 'w-28';

  const pickImage = async (index: number) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.3, // Calidad muy baja para reducir tamaño significativamente
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newPhotos = [...photos];
        newPhotos[index] = result.assets[0].uri;
        setPhotos(newPhotos);
        setError(null); // Limpiar errores anteriores
        
        // Log del tamaño de la imagen seleccionada
        console.log('Imagen seleccionada:', {
          uri: result.assets[0].uri,
          width: result.assets[0].width,
          height: result.assets[0].height,
          fileSize: result.assets[0].fileSize
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setError('Error al seleccionar la imagen');
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
    setUploading(true);
    setError(null);
    
    try {
      const photosToUpload = photos.filter(Boolean);
      
      if (photosToUpload.length === 0) {
        setError('Debes seleccionar al menos una foto');
        return;
      }

      // Verificar que el token esté configurado
      const authHeader = api.defaults.headers.common['Authorization'];
      console.log('Auth header antes de upload:', authHeader);
      
      if (!authHeader) {
        setError('Error de autenticación. Por favor, inicia sesión nuevamente.');
        return;
      }

      // Crear un solo FormData con todas las fotos
      const formData = new FormData();
      formData.append("solicitudId", solicitudId);
      
      // Comprimir y verificar tamaño de cada imagen antes de subir
      for (let i = 0; i < photosToUpload.length; i++) {
        const photo = photosToUpload[i];
        if (photo) {
          try {
            // Comprimir la imagen
            const compressedUri = await compressImage(photo);
            
            // Verificar tamaño después de la compresión
            const response = await fetch(compressedUri);
            const blob = await response.blob();
            const fileSizeInMB = blob.size / (1024 * 1024);
            
            console.log(`Foto ${i + 1} - Tamaño después de compresión: ${fileSizeInMB.toFixed(2)} MB`);
            
            if (fileSizeInMB > 5) { // Límite de 5MB por imagen
              setError(`La imagen ${i + 1} sigue siendo muy grande (${fileSizeInMB.toFixed(2)} MB) después de la compresión. Intenta con una imagen más pequeña.`);
              return;
            }
            
            formData.append("fotos", {
              uri: compressedUri,
              name: `foto_${i}.jpg`,
              type: "image/jpeg",
            } as any);
          } catch (error) {
            console.error(`Error procesando imagen ${i + 1}:`, error);
            setError(`Error procesando la imagen ${i + 1}. Inténtalo de nuevo.`);
            return;
          }
        }
      }
      
      console.log('Subiendo fotos:', photosToUpload.length);
      console.log('Headers que se enviarán:', {
        'Content-Type': 'multipart/form-data',
        'Authorization': authHeader
      });
      
      await api.post("/api/solicitudes/fotos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log('Todas las fotos subidas exitosamente');
      router.push("./RequestSuccess");
    } catch (error: any) {
      console.error('Error uploading photos:', error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
        // Aquí podrías redirigir al login
      } else if (error.response?.status === 413) {
        setError('El archivo es demasiado grande. Intenta con una imagen de menor calidad.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al subir las fotos. Inténtalo de nuevo.');
      }
    } finally {
      setUploading(false);
    }
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
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-2 mb-4">
        Sube fotos de tu problema
      </Text>
      {/* Grid de fotos */}
      <View className="flex-row flex-wrap justify-center mt-2 mb-2 w-full ">
        {photos.map((item, idx) => renderPhotoBox(item, idx))}
      </View>
      {/* Mostrar error si existe */}
      {error && (
        <View className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <Text className="text-red-700 text-center">{error}</Text>
        </View>
      )}

      {/* Botón continuar */}
      <TouchableOpacity
        className={`w-full rounded-xl py-3 mt-4 ${photos.filter((p) => !!p).length >= 3 && !uploading ? 'bg-[#FEDF70]' : 'bg-gray-200'}`}
        disabled={photos.filter((p) => !!p).length < 3 || uploading}
        onPress={handleUpload}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">
          {uploading ? 'Subiendo...' : 'Continuar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
} 