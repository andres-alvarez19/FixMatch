import { useState } from "react";
import api from "../api";

export function useRegistrarUsuario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registrarUsuario = async (data: any): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/api/user/register", data);
      setLoading(false);
      return res.data.id;
    } catch (e: any) {
      setError(e.message || "Error de red");
      setLoading(false);
      return null;
    }
  };

  return { registrarUsuario, loading, error };
} 