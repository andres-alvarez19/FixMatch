import { useState } from "react";
import api from "../api";

export function useRegistrarUsuario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registrarUsuario = async (data: any): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const flattenedData = {
        ...data,
        servicios: data.especialista?.servicios || [],
      };
      delete flattenedData.especialista;


      const res = await api.post("/api/user/register", flattenedData);
      setLoading(false);
      if (res.status === 200 && res.data.id) {
        return res.data.id;
      }
      return null;
    } catch (e: any) {
      setError(e.response?.data?.message || e.message || "Error de red");
      setLoading(false);
      return null;
    }
  };

  return { registrarUsuario, loading, error };
} 