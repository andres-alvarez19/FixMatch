import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, Text, View } from "react-native";
import { useUser } from '../../contexts/UserContext';

export default function LoginLoading() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setUser } = useUser();

  useEffect(() => {
    // Simulación: obtener id y tipoUsuario del backend o de params
    const id = params.id || 'usuario-demo-id';
    const userType = params.userType || 'cliente'; // o 'especialista'
    setUser(id as string, userType as any);
    const timeout = setTimeout(() => {
      router.push({ pathname: "/(tabs)/home", params });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/load_bg.png")}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover"
    >
      <View className="w-full items-center justify-center" style={{ flex: 1 }}>
        <Text className="text-4xl font-bold text-cyan-400 mb-2 mt-20">¡Bienvenido!</Text>
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-36 h-36 my-2"
          resizeMode="contain"
        />
        <Text className="text-xl text-[#1A2341] font-extrabold mt-1 text-center">Da soluciones a tus problemas</Text>
        <View className="items-center mt-10">
          <ActivityIndicator size="large" color="#13c6a0" />
        </View>
      </View>
    </ImageBackground>
  );
} 