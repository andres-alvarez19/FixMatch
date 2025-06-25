import ProgressHeader from "@/components/ProgressHeader";
import { Stack, usePathname, useRouter } from "expo-router";
import React from "react";
import { RegisterProvider } from "./RegisterContext";

// Define el orden de las pantallas en el flujo de registro
const registrationSteps = [
  "/RegisterPhone",
  "/RegisterPassword",
  "/UserTypeForm",
  "/Location",
  "/client/OptionalNewJob",
  "/client/RequestForm",
  "/UploadPhotos",
  "/RegisterLoading",
  // Las rutas de especialista se manejan por separado
];

const specialistSteps = [
  "/RegisterPhone",
  "/RegisterPassword",
  "/UserTypeForm",
  "/Location",
  "/specialist/SpecialistCategory",
  "/specialist/JobRegisterForm",
  "/UploadPhotos",
  "/RegisterLoading",
];


export default function RegisterLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Determina qué flujo y paso es el actual
  const isSpecialistFlow = pathname.includes("specialist");
  const steps = isSpecialistFlow ? specialistSteps : registrationSteps;
  const currentStep = steps.findIndex(step => pathname.startsWith(step)) + 1;
  const totalSteps = steps.length;

  // Decide si mostrar el header
  const showHeader = currentStep > 0;

  return (
    <RegisterProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#FFFDEB" },
          headerStyle: { backgroundColor: "#FFFDEB" },
          header: () =>
            showHeader ? (
              <ProgressHeader
                currentStep={currentStep}
                totalSteps={totalSteps}
                onBack={router.back}
              />
            ) : null,
        }}
      >
        <Stack.Screen name="UserTypeForm" />
        <Stack.Screen name="Location" />
        <Stack.Screen name="ChangeLocation" options={{ headerShown: false }} />
        <Stack.Screen name="UploadPhotos" />
        <Stack.Screen name="client/OptionalNewJob" />
        <Stack.Screen name="RegisterPhone" />
        <Stack.Screen name="RegisterPassword" />
        <Stack.Screen name="client/RequestForm" />
        <Stack.Screen name="specialist/SpecialistCategory" />
        <Stack.Screen name="specialist/JobRegisterForm" />
        <Stack.Screen name="RegisterLoading" />
      </Stack>
    </RegisterProvider>
  );
} 