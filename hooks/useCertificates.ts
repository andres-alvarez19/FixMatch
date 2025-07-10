import { useState, useEffect } from "react";
import api from "../api";

export interface Certificate {
  id: number;
  type: string;
  fileUrl: string;
}

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/certificates/mine");
      setCertificates(response.data || []);
    } catch (error: any) {
      console.error('Error obteniendo certificados:', error);
      setError(error.response?.data?.message || 'Error al obtener certificados');
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const uploadCertificate = async (type: string, fileUrl: string) => {
    try {
      const response = await api.post("/certificates", {
        type,
        fileUrl
      });
      
      // Actualizar la lista de certificados
      setCertificates(prev => [...prev, response.data]);
      return response.data;
    } catch (error: any) {
      console.error('Error subiendo certificado:', error);
      throw error;
    }
  };

  const deleteCertificate = async (id: number) => {
    try {
      await api.delete(`/certificates/${id}`);
      setCertificates(prev => prev.filter(cert => cert.id !== id));
    } catch (error: any) {
      console.error('Error eliminando certificado:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return {
    certificates,
    loading,
    error,
    uploadCertificate,
    deleteCertificate,
    refetch: fetchCertificates
  };
} 