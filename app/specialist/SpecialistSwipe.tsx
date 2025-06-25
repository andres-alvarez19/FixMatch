import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageProgressBar from '../../components/ImageProgressBar';
import { Trabajo } from '../../hooks/useListarTrabajos';

const EXTRA_BOTTOM_PADDING = 42;

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

interface SpecialistSwipeProps {
  trabajos: Trabajo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const SpecialistSwipe = ({ trabajos, loading, error, refetch }: SpecialistSwipeProps) => {
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

  return (
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View>
          <Swiper
              cards={trabajos}
              renderCard={(card: any) => <Card card={card} />}
              onSwipedLeft={(i: number) => console.log('onSwipedLeft:', trabajos[i]?.title)}
              onSwipedRight={(i: number) => console.log('onSwipedRight:', trabajos[i]?.title)}
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

export default SpecialistSwipe; 