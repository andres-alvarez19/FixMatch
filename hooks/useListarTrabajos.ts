import { useCallback, useEffect, useState } from 'react';
import api from "../api";

export interface Trabajo {
  id: number;
  title: string;
  location: string;
  distance: string;
  description: string;
  images: string[];
}

export function useListarTrabajos() {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrabajos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/trabajos');
      setTrabajos(res.data);
    } catch (e: any) {
      setError(e.message || 'Error de red');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrabajos();
  }, [fetchTrabajos]);

  return { trabajos, loading, error, refetch: fetchTrabajos };
} 