import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageProgressBar from '../../components/ImageProgressBar';
import { useUser } from '../../contexts/UserContext';
import { Trabajo, useListarTrabajos } from '../../hooks/useListarTrabajos';
import ClientSwipe from '../client/ClientSwipe';
import SpecialistSwipe from '../specialist/SpecialistSwipe';

/**
 * NOTA sobre el cálculo del padding inferior
 * --------------------------------------------------
 * - `useBottomTabBarHeight()` devuelve la altura TOTAL del contenedor
 *   que expo‑router renderiza para la tab bar (incluye pt / pb + safe‑area).
 * - El botón flotante (w‑14 / h‑14) está posicionado `absolute -top-6` en
 *   `BottomNavbar.tsx`: eso lo hace sobresalir px por encima del navbar.
 * - Para que las tarjetas no invadan ese espacio, sumamos un margen extra
 *   igual al desplazamiento negativo (24 px) + un pequeño colchón.
 */
const EXTRA_BOTTOM_PADDING = 42; // px ajusta si cambias el -top-6 o el tamaño del botón

const Card = ({ card }: { card: Trabajo }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const handleLayout = (evt: any) => setImageWidth(evt.nativeEvent.layout.width);

  const handleImagePress = (evt: any) => {
    const { locationX } = evt.nativeEvent;
    setCurrentImage((prev) => {
      if (locationX < imageWidth / 2) return prev > 0 ? prev - 1 : prev;
      return prev < card.images.length - 1 ? prev + 1 : prev;
    });
  };

  return (
      <View className="flex-1 w-full">
        <TouchableOpacity
            activeOpacity={1}
            className="flex-1 w-full"
            onPressIn={handleImagePress}
            onLayout={handleLayout}
        >
          <ImageBackground
              source={{ uri: card.images[currentImage] }}
              className="flex-1 w-full justify-end"
              imageStyle={{ borderRadius: 0 }}
          >
            <ImageProgressBar total={card.images.length} current={currentImage} />
            <View className="bg-black/40 p-5">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-2xl font-bold text-white flex-1">{card.title}</Text>
                <Ionicons name="information-circle-outline" size={28} color="white" />
              </View>
              <View className="flex-row items-center mb-1">
                <Ionicons name="home-outline" size={16} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white text-base font-semibold">{card.location}</Text>
              </View>
              <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={16} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white text-base font-semibold">{card.distance}</Text>
              </View>
              <Text className="text-white text-base mt-2 ml-6">{card.description}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
  );
};

const HomeScreen = () => {
  const { trabajos, loading, error, refetch } = useListarTrabajos();
  const { user } = useUser();

  if (user?.userType === 'cliente') {
    return <ClientSwipe />;
  }
  if (user?.userType === 'especialista') {
    return <SpecialistSwipe trabajos={trabajos} loading={loading} error={error} refetch={refetch} />;
  }

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text className="text-lg">Cargando trabajos...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text className="text-lg text-red-500">Error: {error}</Text>
        <TouchableOpacity onPress={refetch} className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg">
          <Text>Reintentar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!trabajos.length) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text className="text-lg">No hay trabajos disponibles.</Text>
      </SafeAreaView>
    );
  }

  return null; // O un loader/spinner mientras se determina el tipo de usuario
};

export default HomeScreen;
