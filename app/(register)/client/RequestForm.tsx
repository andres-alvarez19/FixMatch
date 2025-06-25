import LogoHeader from "@/components/LogoHeader";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

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
  const [errors, setErrors] = useState<any>({});
  const [formTriedSubmit, setFormTriedSubmit] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!selectedSpecialty) newErrors.selectedSpecialty = "Debes seleccionar una especialidad";
    if (!requestName.trim()) newErrors.requestName = "El nombre de la solicitud es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setFormTriedSubmit(true);
    if (validate()) {
      router.push("/UploadPhotos");
    }
  };

  useEffect(() => {
    if (formTriedSubmit) validate();
    // eslint-disable-next-line
  }, [selectedSpecialty, requestName, description]);

  return (
    <View className="flex-1 p-6 bg-[#FFFDEB]">
      <LogoHeader showTitle={true} height={60} width={60} />
      <Text className="text-3xl font-bold text-cyan-500 text-center mt-4 mb-4">
        Crea una nueva solicitud
      </Text>

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
      {formTriedSubmit && errors.selectedSpecialty && <Text className="text-red-500 text-xs mb-2">{errors.selectedSpecialty}</Text>}

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
      <Text className="text-base font-semibold text-black mb-1">Descripcion</Text>
      <TextInput
        className="text-lg border border-cyan-300 rounded-lg px-4 py-4 bg-white mb-6"
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