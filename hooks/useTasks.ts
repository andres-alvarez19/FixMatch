import { useEffect, useState } from 'react';
import api from "../api";

export interface Task {
  id: string;
  status: string;
  date: string;
  time: string;
  user: {
    name: string;
    avatar: string;
  };
}

export function useTasks(userId: string | null) {
  const [scheduledTasks, setScheduledTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        // Llamadas reales a la API
        const scheduledRes = await api.get('/api/tasks/scheduled?userId=' + (userId || ''));
        const completedRes = await api.get('/api/tasks/completed?userId=' + (userId || ''));
        setScheduledTasks(scheduledRes.data);
        setCompletedTasks(completedRes.data);
      } catch (error) {
        setError('Error al obtener las tareas');
        setScheduledTasks([]);
        setCompletedTasks([]);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchTasks();
  }, [userId]);

  return { scheduledTasks, completedTasks, loading, error };
} 