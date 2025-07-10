// Variable universal para la URL base del backend
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8080";

import axios from "axios";

const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para configurar el token de autenticación
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token configurado en headers:', api.defaults.headers.common['Authorization']);
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Token removido de headers');
  }
};

// Interceptor de request para loggear headers
api.interceptors.request.use(
  (config) => {
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configurar interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('Response error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expirado o inválido, limpiar token
      setAuthToken(null);
      console.log('Token expirado o inválido, redirigiendo al login...');
      
      // Emitir evento para que la app pueda manejar la redirección
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth-error', { detail: 'token-expired' }));
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Función para verificar disponibilidad de email
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  try {
    const response = await api.get(`/api/user/check-email?email=${encodeURIComponent(email)}`);
    return response.data.available;
  } catch (error) {
    console.error('Error checking email availability:', error);
    return false; // En caso de error, asumimos que no está disponible por seguridad
  }
}; 