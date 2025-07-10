import { useState } from "react";
import api from "../api";

export interface UpdateProfileData {
  name?: string;
  dateOfBirth?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  location?: string;
  profileImage?: string;
  aboutMe?: string;
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (profileData: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('Actualizando perfil:', profileData);
      console.log('Headers de la petición:', api.defaults.headers.common);
      
      const response = await api.put("/api/user/profile", profileData);
      
      console.log('Perfil actualizado exitosamente:', response.data);
      setSuccess(true);
      
      return response.data;
    } catch (error: any) {
      console.error('Error actualizando perfil:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al actualizar el perfil. Inténtalo de nuevo.');
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    updateProfile,
    loading,
    error,
    success,
    resetState
  };
} 