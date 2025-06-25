import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ImageProgressBar from '../../components/ImageProgressBar';

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

interface Job {
  id: number;
  title: string;
  location: string;
  distance: string;
  description: string;
  images: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Reparacion Baño',
    location: 'Temuco',
    distance: '3 kilometer away',
    description: 'Renovación completa de instalaciones sanitarias y azulejos',
    images: [
      'https://www.aquitureforma.com/wp-content/uploads/2021/12/materiales-para-reformar-un-bano-768x1024.jpg',
      'https://biconfort.com/wp-content/uploads/2024/09/Cuanto-cuesta-reformar-un-bano-pequeno-769x1024.jpg',
    ],
  },
  {
    id: 2,
    title: 'Instalación Eléctrica',
    location: 'Padre Las Casas',
    distance: '5 kilometer away',
    description: 'Cableado completo para nueva construcción residencial.',
    images: [
      'https://biconfort.com/wp-content/uploads/2024/09/Cuanto-cuesta-reformar-un-bano-pequeno-769x1024.jpg',
      'https://www.aquitureforma.com/wp-content/uploads/2021/12/materiales-para-reformar-un-bano-768x1024.jpg',
    ],
  },
];

const Card = ({ card }: { card: Job }) => {
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

  return (
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View>
          <Swiper
              cards={jobs}
              renderCard={(card: Job) => <Card card={card} />}
              //containerStyle={{ flex: 1 }}
              //cardStyle={{ margin: 0, padding: 0 }}
              //cardHorizontalMargin={0}
              //cardVerticalMargin={0}
              onSwipedLeft={(i: number) => console.log('onSwipedLeft:', jobs[i].title)}
              onSwipedRight={(i: number) => console.log('onSwipedRight:', jobs[i].title)}
              onSwipedAll={() => console.log('onSwipedAll')}
              backgroundColor="#f2f2f2"
              stackSize={3}
              stackSeparation={15}
              animateCardOpacity
              verticalSwipe={false}
          />
        </View>
      </SafeAreaView>
  );
};

export default HomeScreen;
