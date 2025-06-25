import { useState } from "react";
import api from "../api";

interface SolicitudData {
  especialidad: string;
  nombreSolicitud: string;
  descripcion: string;
  usuarioId: string;
}

export function useCrearSolicitud() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearSolicitud = async (data: SolicitudData): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/api/solicitudes", data);
      setLoading(false);
      return res.data.id;
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
      } else {
        setError(e.message || "Error de red");
      }
      setLoading(false);
      return null;
    }
  };

  return { crearSolicitud, loading, error };
} 