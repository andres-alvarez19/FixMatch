import { useState } from 'react';
import api from "../api";

export interface Proyecto {
  nombre: string;
  descripcion: string;
  fecha: string;
  usuarioId: string;
}

export function useSubirProyecto() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  // proyecto: { nombre, descripcion, fecha, ... }, fotos: array de archivos o urls
  const subirProyecto = async (proyecto: Proyecto, fotos: File[]) => {
    setCargando(true);
    setError(null);
    setExito(false);
    try {
      const formData = new FormData();
      formData.append('nombre', proyecto.nombre);
      formData.append('descripcion', proyecto.descripcion);
      formData.append('fecha', proyecto.fecha);
      fotos.forEach((foto: File) => {
        formData.append('fotos', foto);
      });
      const response = await api.post('/api/proyectos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExito(true);
      return response.data.id;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setCargando(false);
    }
  };

  return { subirProyecto, cargando, error, exito };
} 