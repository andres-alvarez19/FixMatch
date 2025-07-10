import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useUserProfile } from "../../hooks/useUserProfile"
import { useCertificates } from "../../hooks/useCertificates"

export default function EditProfileSections() {
    const router = useRouter()
    const { profile, loading: profileLoading } = useUserProfile()
    const { certificates, loading: certificatesLoading, deleteCertificate } = useCertificates()

    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Ionicons key={i} name="star" size={16} color="#FFA500" />)
        }

        if (hasHalfStar) {
            stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFA500" />)
        }

        const remainingStars = 5 - Math.ceil(rating)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFA500" />)
        }

        return stars
    }

    // Mostrar loading mientras se cargan los datos
    if (profileLoading || certificatesLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#FFFEF7]">
                <Text className="text-lg text-gray-700">Cargando perfil...</Text>
            </View>
        )
    }

    return (
        <ScrollView className="flex-1 bg-[#FFFEF7]">
            {/* Header with gradient background */}
            <View className="relative">
                <View
                    className="h-80 px-6 pt-12 pb-6 rounded-b-3xl"
                    style={{
                        backgroundColor: "#4A5568", // Fallback para Nativewind
                    }}
                >
                    {/* Back Button */}
                    <TouchableOpacity className="absolute top-12 left-6 z-10" onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="white" />
                    </TouchableOpacity>

                    {/* Profile Image and Info */}
                    <View className="flex-row items-start mb-8 mt-8">
                        {profile?.profileImage ? (
                            <Image
                                source={{ uri: profile.profileImage }}
                                className="w-20 h-20 rounded-full mr-4"
                            />
                        ) : (
                            <View className="w-20 h-20 rounded-full mr-4 bg-white/20 items-center justify-center">
                                <Ionicons name="person" size={32} color="white" />
                            </View>
                        )}
                        <View className="flex-1">
                            <Text className="text-white text-2xl font-bold mb-1">{profile?.fullName || "Usuario"}</Text>
                            <Text className="text-white/80 text-base">{profile?.location || "Ubicación no especificada"}</Text>
                        </View>
                    </View>

                    {/* Stats Cards */}
                    <View className="flex-row justify-between mb-4">
                        <View className="bg-white/90 rounded-2xl p-4 flex-1 mr-3">
                            <Text className="text-gray-600 text-sm mb-1">Rating</Text>
                            <Text className="text-black text-2xl font-bold mb-2">{profile?.rating?.toFixed(1) || "0.0"}</Text>
                            <View className="flex-row">{renderStars(profile?.rating || 0)}</View>
                        </View>

                        <View className="bg-white/90 rounded-2xl p-4 flex-1 ml-3">
                            <Text className="text-gray-600 text-sm mb-1">Projects</Text>
                            <Text className="text-black text-2xl font-bold mb-2">{profile?.projects || 0}</Text>
                            <Ionicons name="briefcase-outline" size={20} color="#666" />
                        </View>
                    </View>
                </View>
            </View>

            {/* Content Sections */}
            <View className="px-6 py-6">
                {/* About Me */}
                <View className="mb-8">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Ionicons name="person-circle-outline" size={24} color="#FFA500" />
                            <Text className="text-xl font-bold text-gray-800 ml-3">About me</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="pencil" size={20} color="#FFA500" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-gray-600 text-base leading-6">
                        {profile?.aboutMe || "No hay información disponible sobre este usuario."}
                    </Text>
                </View>

                {/* Education */}
                <View className="mb-8">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Ionicons name="school-outline" size={24} color="#FFA500" />
                            <Text className="text-xl font-bold text-gray-800 ml-3">Education</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="add-circle-outline" size={24} color="#FFA500" />
                        </TouchableOpacity>
                    </View>

                    {profile?.education && profile.education.length > 0 ? (
                        profile.education.map((edu, index) => (
                            <View key={index} className="bg-white rounded-2xl p-4 shadow-sm mb-3">
                                <View className="flex-row items-start justify-between">
                                    <View className="flex-1">
                                        <Text className="text-lg font-bold text-gray-800 mb-1">{edu.title}</Text>
                                        <Text className="text-gray-600 text-base mb-1">{edu.institution}</Text>
                                        <Text className="text-gray-500 text-sm">{edu.period}</Text>
                                    </View>
                                    <TouchableOpacity className="ml-4">
                                        <Ionicons name="pencil" size={20} color="#FFA500" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View className="bg-white rounded-2xl p-4 shadow-sm">
                            <Text className="text-gray-500 text-center">No hay educación registrada</Text>
                        </View>
                    )}
                </View>

                {/* Resume */}
                <View className="mb-8">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Ionicons name="document-text-outline" size={24} color="#FFA500" />
                            <Text className="text-xl font-bold text-gray-800 ml-3">Resume</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="add-circle-outline" size={24} color="#FFA500" />
                        </TouchableOpacity>
                    </View>

                    {profile?.resume ? (
                        <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
                            <View className="w-12 h-12 bg-red-500 rounded-lg items-center justify-center mr-4">
                                <Text className="text-white font-bold text-xs">PDF</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-semibold text-base mb-1">{profile.resume.name}</Text>
                                <Text className="text-gray-500 text-sm">{profile.resume.size} Kb • {profile.resume.date}</Text>
                            </View>
                        </View>
                    ) : (
                        <View className="bg-white rounded-2xl p-4 shadow-sm">
                            <Text className="text-gray-500 text-center">No hay currículum registrado</Text>
                        </View>
                    )}
                </View>

                {/* Certificates */}
                <View className="mb-8">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Ionicons name="ribbon-outline" size={24} color="#FFA500" />
                            <Text className="text-xl font-bold text-gray-800 ml-3">Certificates</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="add-circle-outline" size={24} color="#FFA500" />
                        </TouchableOpacity>
                    </View>

                    {certificates && certificates.length > 0 ? (
                        certificates.map((cert, index) => (
                            <View key={index} className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center mb-3">
                                <View className="w-12 h-12 bg-red-500 rounded-lg items-center justify-center mr-4">
                                    <Text className="text-white font-bold text-xs">PDF</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-800 font-semibold text-base mb-1">{cert.type}</Text>
                                    <Text className="text-gray-500 text-sm">Certificado</Text>
                                </View>
                                <TouchableOpacity 
                                    className="ml-4"
                                    onPress={() => deleteCertificate(cert.id)}
                                >
                                    <MaterialIcons name="delete-outline" size={24} color="#FF6B6B" />
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <View className="bg-white rounded-2xl p-4 shadow-sm">
                            <Text className="text-gray-500 text-center">No hay certificados registrados</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}
