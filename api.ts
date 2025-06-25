// Variable universal para la URL base del backend
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080";

import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api; 