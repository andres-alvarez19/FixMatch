import React, { createContext, useContext, useState } from "react";

// Estructura base para los datos de registro
const initialRegisterData = {
  tipoUsuario: undefined, // 'cliente' o 'especialista'
  // Datos comunes
  nombre: "",
  email: "",
  telefono: "",
  password: "",
  ubicacion: "",
  // Especialista
  especialista: {
    servicios: [], // array de strings
  },
};

const RegisterContext = createContext<any>(null);

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [registerData, setRegisterData] = useState(initialRegisterData);

  // Actualiza cualquier campo del registro (nivel raíz o anidado)
  const updateRegisterData = (newData: any) => {
    setRegisterData((prev) => ({
      ...prev,
      ...newData,
      especialista: {
        ...prev.especialista,
        ...(newData.especialista || {}),
      },
    }));
  };

  const resetRegisterData = () => setRegisterData(initialRegisterData);

  return (
    <RegisterContext.Provider value={{ registerData, updateRegisterData, resetRegisterData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext); 