import LogoHeader from "@/components/LogoHeader";
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function JobRegisterForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  let jobTypes: string[] = [
    "Plomeria",
    "Electricidad",
    "Gasfiter",
    "Pintura",
    "Carpintería",
    "Limpieza",
    "Construcción",
    "Mecánico",
  ];
  if (params.jobTypes) {
    try {
      const parsed = JSON.parse(params.jobTypes as string);
      if (Array.isArray(parsed) && parsed.length > 0) {
        jobTypes = parsed.map((j) => j.charAt(0).toUpperCase() + j.slice(1));
      }
    } catch {}
  }
  const [selectedJob, setSelectedJob] = useState(jobTypes[0]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formTriedSubmit, setFormTriedSubmit] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!selectedJob) newErrors.selectedJob = "Debes seleccionar un tipo de trabajo";
    if (!projectName.trim()) newErrors.projectName = "El nombre del proyecto es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!date) newErrors.date = "La fecha es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setFormTriedSubmit(true);
    if (validate()) {
      router.push("../UploadPhotos");
    }
  };

  useEffect(() => {
    if (formTriedSubmit) validate();
    // eslint-disable-next-line
  }, [selectedJob, projectName, description, date]);

  return (
    <View className="flex-1 p-6 bg-[#FFFDEB]">
      <LogoHeader showTitle={true} height={50} width={50} />
      {/* Título */}
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-4 mb-6">
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
      {formTriedSubmit && errors.selectedJob && <Text className="text-red-500 text-xs mb-2">{errors.selectedJob}</Text>}

      {/* Nombre de proyecto */}
      <Text className="text-base font-semibold text-black mb-1">Nombre de proyecto</Text>
      <TextInput
        className="text-lg border border-cyan-300 rounded-lg px-3 py-4 bg-white mb-3"
        placeholder="Ej: Instalacion hogar 2025"
        value={projectName}
        onChangeText={setProjectName}
      />
      {formTriedSubmit && errors.projectName && <Text className="text-red-500 text-xs mb-2">{errors.projectName}</Text>}

      {/* Fecha de emisión */}
      <Text className="text-base font-semibold text-black mb-1">Fecha de emision</Text>
      <TouchableOpacity
        className="text-lg border border-cyan-300 rounded-lg px-3 py-4 bg-white mb-3 flex-row items-center"
        onPress={() => setShowDate(true)}
        activeOpacity={0.8}
      >
        <Text className="flex-1 text-[#222] text-base">
          {date.toLocaleDateString("es-CL")}
        </Text>
        <Ionicons name="calendar-outline" size={22} color="#13c6a0" />
      </TouchableOpacity>
      {formTriedSubmit && errors.date && <Text className="text-red-500 text-xs mb-2">{errors.date}</Text>}
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event: any, selectedDate?: Date) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* Descripción */}
      <Text className="text-base font-semibold text-black mb-1">Descripcion</Text>
      <TextInput
        className="text-lg border border-cyan-300 rounded-lg px-3 py-2 bg-white mb-6"
        placeholder="Ej: Arreglo de tuberias averiadas debido a una reparacion externa"
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