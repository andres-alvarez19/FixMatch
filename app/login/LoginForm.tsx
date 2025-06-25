import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from '../../api';
import { useUser } from '../../contexts/UserContext';

interface LoginFormProps {
  showPassword: boolean;
  onShowPassword: () => void;
}

export default function LoginForm({ showPassword, onShowPassword }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formTriedSubmit, setFormTriedSubmit] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const validate = () => {
    const newErrors: any = {};
    if (!email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "El email debe ser válido";
    if (!password) newErrors.password = "La contraseña es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setFormTriedSubmit(true);
    if (validate()) {
      try {
        // Llama a tu backend de login
        const res = await api.post('/api/login', { email, password });
        // Suponiendo que la respuesta es { id, tipoUsuario }
        // Después del login exitoso, obtener el perfil completo
        const profileRes = await api.get('/api/user/profile');
        setUser(profileRes.data); // Guarda el perfil completo en el contexto
        router.push({
          pathname: "./login/LoginLoading",
          params: { id: res.data.id, userType: res.data.tipoUsuario }
        });
      } catch (e: any) {
        setErrors({ general: e.response?.data?.message || 'Error de autenticación' });
      }
    }
  };

  // Ejecutar validación en cada cambio de campo
  useEffect(() => {
    if (formTriedSubmit) validate();
    // eslint-disable-next-line
  }, [email, password]);

  return (
    <>
      {/* Email */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Email</Text>
        <TextInput
          className="border border-cyan-300 rounded-lg px-3 py-2 bg-white"
          placeholder="ejemplo@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {formTriedSubmit && errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
      </View>
      {/* Password */}
      <View className="w-full mb-2">
        <Text className="mb-1 text-base text-black">Contraseña</Text>
        <View className="flex-row items-center border border-cyan-300 rounded-lg bg-white px-3">
            <TextInput
            className="flex-1 py-2"
            placeholder="********"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            />
            <TouchableOpacity onPress={onShowPassword}>
            {showPassword ? (
                <EyeOff size={20} color="#888" />
            ) : (
                <Eye size={20} color="#888" />
            )}
            </TouchableOpacity>
        </View>  
        {formTriedSubmit && errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>}
      </View>
      {/* Botón */}
      <TouchableOpacity className={`w-full rounded-lg py-3 mt-4 mb-2 ${(formTriedSubmit && Object.keys(errors).length > 0) ? 'bg-gray-200' : 'bg-yellow-300'}`}
        onPress={handleLogin}
        disabled={formTriedSubmit && Object.keys(errors).length > 0}
      >
        <Text className="text-center text-lg text-[#1A2341] font-medium">Iniciar sesion</Text>
      </TouchableOpacity>
      {/* Olvidé contraseña */}
      <TouchableOpacity>
        <Text className="text-center text-black font-semibold mt-2">Olvide la contraseña</Text>
      </TouchableOpacity>
      {errors.general && <Text className="text-red-500 text-xs mt-1">{errors.general}</Text>}
    </>
  );
} 