import { useState, useCallback, useEffect, useRef } from 'react';
import { checkEmailAvailability } from '../api';

export const useEmailValidation = () => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const validateEmail = useCallback(async (email: string): Promise<boolean> => {
    if (!email.trim()) {
      setEmailError("El email es obligatorio");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("El email debe ser válido");
      return false;
    }

    setIsCheckingEmail(true);
    setEmailError(null);

    try {
      const isAvailable = await checkEmailAvailability(email);
      if (!isAvailable) {
        setEmailError("Este email ya está registrado");
        return false;
      }
      setEmailError(null);
      return true;
    } catch (error) {
      setEmailError("Error al verificar el email. Inténtalo de nuevo.");
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  }, []);

  const clearEmailError = useCallback(() => {
    setEmailError(null);
  }, []);

  const validateEmailOnChange = useCallback((email: string) => {
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Limpiar error inmediatamente
    setEmailError(null);

    // Si el email está vacío o no es válido, no validar
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      return;
    }

    // Validar después de 500ms de inactividad
    timeoutRef.current = setTimeout(async () => {
      setIsCheckingEmail(true);
      try {
        const isAvailable = await checkEmailAvailability(email);
        if (!isAvailable) {
          setEmailError("Este email ya está registrado");
        }
      } catch (error) {
        console.error('Error checking email:', error);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500);
  }, []);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    validateEmail,
    validateEmailOnChange,
    isCheckingEmail,
    emailError,
    clearEmailError
  };
}; 