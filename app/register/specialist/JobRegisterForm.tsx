import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import RegistrationLayout from "../../../layouts/RegistrationLayout";

const jobTypes = [
  "Plomeria",
  "Electricidad",
  "Gasfiter",
  "Pintura",
  "Carpintería",
  "Limpieza",
  "Construcción",
  "Mecánico",
];

export default function JobRegisterForm() {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(jobTypes[0]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDate(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <RegistrationLayout currentStep={4} totalSteps={6} showLogoTitle={true}>
        {/* Título */}
        <Text className="text-3xl font-bold text-cyan-500 text-center mt-0 mb-6">
            Cuentanos de tus proyectos
        </Text>
      {/* Tipo de trabajo */}
      <Text className="text-base font-semibold text-black mb-1">Tipo de trabajo</Text>
      <View className="border border-cyan-300 rounded-lg mb-3 py-0 bg-white">
        <Picker
          selectedValue={selectedJob}
          onValueChange={setSelectedJob}
        >
          {jobTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {/* Nombre de proyecto */}
      <Text className="text-base font-semibold text-black mb-1">Nombre de proyecto</Text>
      <TextInput
        className="border border-cyan-300 rounded-lg px-3 py-2 bg-white mb-3"
        placeholder="Ej: Instalacion hogar 2025"
        value={projectName}
        onChangeText={setProjectName}
      />

      {/* Fecha de emisión */}
      <Text className="text-base font-semibold text-black mb-1">Fecha de emision</Text>
      <TouchableOpacity
        className="border border-cyan-300 rounded-lg px-3 py-2 bg-white mb-3 flex-row items-center"
        onPress={() => setShowDate(true)}
        activeOpacity={0.8}
      >
        <Text className="flex-1 text-[#222] text-base">
          {date.toLocaleDateString("es-CL")}
        </Text>
        <Ionicons name="calendar-outline" size={22} color="#13c6a0" />
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
        />
      )}

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