import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import RegistrationLayout from "../../../layouts/RegistrationLayout";

const specialties = [
  "Plomeria",
  "Electricidad",
  "Gasfiter",
  "Pintura",
  "Carpintería",
  "Limpieza",
  "Construcción",
  "Mecánico",
];

export default function RequestForm() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties[0]);
  const [requestName, setRequestName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <RegistrationLayout currentStep={4} totalSteps={6} showLogoTitle={true}>
      <Text className="text-3xl font-bold text-cyan-400 text-center mb-4">Solicitud</Text>

      {/* Especialidad */}
      <Text className="text-base font-semibold text-black mb-1">Especialidad</Text>
      <View className="border border-cyan-300 rounded-lg mb-3 bg-white">
        <Picker
          selectedValue={selectedSpecialty}
          onValueChange={setSelectedSpecialty}
          style={{ color: '#222', width: '100%' }}
        >
          {specialties.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {/* Nombre de solicitud */}
      <Text className="text-base font-semibold text-black mb-1">Nombre de solicitud</Text>
      <TextInput
        className="border border-cyan-300 rounded-lg px-3 py-2 bg-white mb-3"
        placeholder="Ej: Instalacion hogar 2025"
        value={requestName}
        onChangeText={setRequestName}
      />

      {/* Descripción */}
      <Text className="text-base font-semibold text-black mb-1">Descripcion</Text>
      <TextInput
        className="border border-cyan-300 rounded-lg px-3 py-2 bg-white mb-6"
        placeholder="Ej: Arreglo de tuberias averiadas debido a una reparacion externa"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={{ minHeight: 60, textAlignVertical: 'top' }}
      />

      {/* Botón continuar */}
      <TouchableOpacity
        className="w-full bg-yellow-300 rounded-lg py-3 mb-2"
        onPress={() => {router.push("/register/UploadPhotos");}}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Continuar</Text>
      </TouchableOpacity>
    </RegistrationLayout>
  );
} 