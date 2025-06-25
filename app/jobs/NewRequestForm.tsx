import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NewRequestForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const specialty = params.specialty as string;
  const [requestName, setRequestName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formTriedSubmit, setFormTriedSubmit] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!specialty) newErrors.specialty = "Debes seleccionar una especialidad";
    if (!requestName.trim()) newErrors.requestName = "El nombre de la solicitud es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setFormTriedSubmit(true);
    if (validate()) {
      router.push("/jobs/UploadPhotos");
    }
  };

  useEffect(() => {
    if (formTriedSubmit) validate();
  }, [specialty, requestName, description]);

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

      {/* Título (ajustado con margen negativo para centrarlo visualmente) */}
      <Text className="text-3xl font-bold text-cyan-500 text-center -mt-16 mb-4">
        Nueva solicitud de trabajo
      </Text>

      {/* Especialidad (solo texto) */}
      <Text className="text-base font-semibold text-black mb-1">Especialidad</Text>
      <View className="border border-cyan-300 rounded-lg mb-3 bg-white px-4 py-3">
        <Text className="text-base text-[#1A2341]">{specialty}</Text>
      </View>
      {formTriedSubmit && errors.specialty && <Text className="text-red-500 text-xs mb-2">{errors.specialty}</Text>}

      {/* Nombre de solicitud */}
      <Text className="text-base font-semibold text-black mb-1">Nombre de solicitud</Text>
      <TextInput
        className="text-lg border border-cyan-300 rounded-lg px-3 py-4 bg-white mb-3"
        placeholder="Ej: Instalacion hogar 2025"
        value={requestName}
        onChangeText={setRequestName}
      />
      {formTriedSubmit && errors.requestName && <Text className="text-red-500 text-xs mb-2">{errors.requestName}</Text>}

      {/* Descripción */}
      <Text className="text-base font-semibold text-black mb-1">Descripción</Text>
      <TextInput
        className="text-lg border border-cyan-300 rounded-lg px-4 py-4 bg-white mb-6"
        placeholder="Ej: Arreglo de tuberías averiadas debido a una reparación externa"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={6}
        style={{ minHeight: 180, textAlignVertical: 'top' }}
      />
      {formTriedSubmit && errors.description && <Text className="text-red-500 text-xs mb-2">{errors.description}</Text>}

      {/* Botón continuar */}
      <TouchableOpacity
        className={`w-full rounded-lg py-3 mb-2 ${(formTriedSubmit && Object.keys(errors).length > 0) ? 'bg-gray-200' : 'bg-yellow-300'}`}
        onPress={handleContinue}
        disabled={formTriedSubmit && Object.keys(errors).length > 0}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
} 