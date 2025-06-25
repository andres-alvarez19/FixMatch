import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Swiper from "react-native-deck-swiper"
import { SafeAreaView } from "react-native-safe-area-context"

interface Specialist {
  id: number
  name: string
  profession: string
  location: string
  rating: number
  completedJobs: number
  avatar: string
  available: boolean
  mainProject: {
    title: string
    date: string
    description: string
    beforeImage: string
    afterImage?: string
  }
  featuredWorks: Array<{
    id: string
    title: string
    image: string
  }>
  reviews: Array<{
    id: string
    userName: string
    userAvatar: string
    rating: number
    comment: string
    timeAgo: string
  }>
}

const specialists: Specialist[] = [
  {
    id: 1,
    name: "Juan Almonacid",
    profession: "Plomero, gasfiter",
    location: "Temuco",
    rating: 4.5,
    completedJobs: 50,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    available: true,
    mainProject: {
      title: "Reparación completa de baño",
      date: "20 noviembre 2024",
      description: "Renovación completa de instalaciones sanitarias y azulejos",
      beforeImage: "/assets/images/antes.jpg",
    },
    featuredWorks: [
      {
        id: "1",
        title: "Baño visitas",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
      },
      {
        id: "2",
        title: "Cocina",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      },
    ],
    reviews: [
      {
        id: "1",
        userName: "Jinny Oslin",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.5,
        comment: "I highly recommend Dianne for any plumbing needs, he truly is an expert in his field.",
        timeAgo: "A day ago",
      },
      {
        id: "2",
        userName: "Esteban Esparza",
        userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 5,
        comment: "I highly recommend Dianne for any plumbing needs, he truly is an expert in his field.",
        timeAgo: "A day ago",
      },
      {
        id: "3",
        userName: "Jinny Oslin",
        userAvatar: "https://randomuser.me/api/portraits/women/46.jpg",
        rating: 4.5,
        comment: "I highly recommend Dianne for any plumbing needs, he truly is an expert in his field.",
        timeAgo: "A day ago",
      },
    ],
  },
  {
    id: 2,
    name: "María González",
    profession: "Electricista",
    location: "Padre Las Casas",
    rating: 4.8,
    completedJobs: 75,
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    available: true,
    mainProject: {
      title: "Instalación eléctrica completa",
      date: "18 noviembre 2024",
      description: "Cableado completo para nueva construcción residencial",
      beforeImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=600&fit=crop",
    },
    featuredWorks: [
      {
        id: "1",
        title: "Sala de estar",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      },
      {
        id: "2",
        title: "Dormitorio",
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
      },
    ],
    reviews: [
      {
        id: "1",
        userName: "Carlos Ruiz",
        userAvatar: "https://randomuser.me/api/portraits/men/47.jpg",
        rating: 5,
        comment: "Excelente trabajo, muy profesional y puntual. Recomendado 100%.",
        timeAgo: "2 days ago",
      },
    ],
  },
]

const renderStars = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Ionicons key={i} name="star" size={14} color="#FFA500" />)
  }

  if (hasHalfStar) {
    stars.push(<Ionicons key="half" name="star-half" size={14} color="#FFA500" />)
  }

  const remainingStars = 5 - Math.ceil(rating)
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#FFA500" />)
  }

  return stars
}

const SpecialistCard = ({ specialist }: { specialist: Specialist }) => {
  return (
    <ScrollView className="flex-1 bg-[#FFFEF7]" showsVerticalScrollIndicator={false}>
      {/* Main Project Image */}
      <View className="relative h-96">
        <Image source={{ uri: specialist.mainProject.beforeImage }} className="w-full h-full" resizeMode="cover" />

        {/* Antes Badge */}
        <View className="absolute top-4 left-4 bg-cyan-400 rounded-full px-3 py-1 flex-row items-center">
          <Text className="text-white font-semibold text-sm mr-1">Antes</Text>
          <Ionicons name="camera" size={14} color="white" />
        </View>

        {/* Info Button */}
        <TouchableOpacity className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full items-center justify-center">
          <Ionicons name="information" size={16} color="white" />
        </TouchableOpacity>

        {/* Project Info Overlay */}
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
          <Text className="text-white text-xl font-bold mb-2">{specialist.mainProject.title}</Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar-outline" size={16} color="white" />
            <Text className="text-white text-sm ml-2">{specialist.mainProject.date}</Text>
          </View>
          <Text className="text-white text-sm">{specialist.mainProject.description}</Text>
        </View>
      </View>

      {/* Specialist Info Card */}
      <View className="mx-4 -mt-6 bg-yellow-200 rounded-2xl p-4 shadow-lg relative z-10">
        <View className="flex-row items-center">
          <Image source={{ uri: specialist.avatar }} className="w-16 h-16 rounded-2xl mr-4" />
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800 mb-1">{specialist.name}</Text>
            <Text className="text-gray-600 text-base mb-1">{specialist.profession}</Text>
            <Text className="text-gray-600 text-base mb-2">{specialist.location}</Text>

            {specialist.available && (
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text className="text-green-600 text-sm font-medium">Disponible hoy</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mt-4 pt-4 border-t border-yellow-300">
          <View className="items-center">
            <Text className="text-gray-600 text-sm mb-1">Valoración</Text>
            <Text className="text-2xl font-bold text-gray-800 mb-1">{specialist.rating}</Text>
            <View className="flex-row">{renderStars(specialist.rating)}</View>
          </View>
          <View className="items-center">
            <Text className="text-gray-600 text-sm mb-1">Trabajos</Text>
            <Text className="text-2xl font-bold text-gray-800 mb-1">{specialist.completedJobs}</Text>
            <Ionicons name="briefcase-outline" size={16} color="#666" />
          </View>
        </View>
      </View>

      {/* Featured Works */}
      <View className="mx-4 mt-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-gray-800">Trabajos destacados</Text>
          <TouchableOpacity>
            <Text className="text-cyan-500 font-semibold">Ver todos</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row space-x-3">
          {specialist.featuredWorks.map((work) => (
            <View key={work.id} className="flex-1">
              <View className="bg-yellow-100 rounded-2xl p-3 h-32 relative">
                <Image source={{ uri: work.image }} className="w-full h-20 rounded-xl mb-2" resizeMode="cover" />
                <Text className="text-gray-800 font-semibold text-sm">{work.title}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Reviews */}
      <View className="mx-4 mt-6 mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-gray-800">Reseñas</Text>
          <TouchableOpacity>
            <Text className="text-cyan-500 font-semibold">Ver todos</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-yellow-100 rounded-2xl p-4">
          {specialist.reviews.map((review, index) => (
            <View
              key={review.id}
              className={`${index > 0 ? "border-t border-yellow-200 pt-4" : ""} ${index < specialist.reviews.length - 1 ? "pb-4" : ""}`}
            >
              <View className="flex-row items-start">
                <Image source={{ uri: review.userAvatar }} className="w-10 h-10 rounded-full mr-3" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="font-bold text-gray-800">{review.userName}</Text>
                    <View className="flex-row">{renderStars(review.rating)}</View>
                  </View>
                  <Text className="text-gray-500 text-xs mb-2">{review.timeAgo}</Text>
                  <Text className="text-gray-700 text-sm leading-5">{review.comment}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default function ClientSwipe() {
  const router = useRouter()

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#FFFEF7]">
      <Swiper
        cards={specialists}
        renderCard={(specialist: Specialist) => <SpecialistCard specialist={specialist} />}
        containerStyle={{ flex: 1 }}
        cardStyle={{ margin: 0, padding: 0 }}
        onSwipedLeft={(cardIndex: number) => console.log("Rechazado:", specialists[cardIndex].name)}
        onSwipedRight={(cardIndex: number) => console.log("Aceptado:", specialists[cardIndex].name)}
        onSwipedAll={() => console.log("No hay más especialistas")}
        cardIndex={0}
        backgroundColor={"#FFFEF7"}
        stackSize={2}
        stackSeparation={15}
        animateCardOpacity
        verticalSwipe={false}
        showSecondCard={true}
        animateOverlayLabelsOpacity
        overlayLabels={{
          left: {
            title: "RECHAZAR",
            style: {
              label: {
                backgroundColor: "#FF6B6B",
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                borderRadius: 10,
                padding: 10,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: "CONTACTAR",
            style: {
              label: {
                backgroundColor: "#4ECDC4",
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                borderRadius: 10,
                padding: 10,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
        }}
      />
    </SafeAreaView>
  )
}
