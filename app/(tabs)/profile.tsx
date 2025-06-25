import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useUser } from '../../contexts/UserContext'
import { useUserProfile } from "../../hooks/useUserProfile"


const ProfileScreen = () => {
    const router = useRouter()
    const { profile, loading } = useUserProfile()
    const { id, userType } = useUser()

    if (loading || !profile) {
        return (
            <View className="flex-1 justify-center items-center bg-[#FFFEF7]">
                <Text className="text-lg text-gray-700">Cargando perfil...</Text>
            </View>
        )
    }

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

    return (
        <ScrollView className="flex-1 bg-[#FFFEF7]">
            {/* Header with gradient background */}
            <View className="relative">
                <LinearGradient
                    colors={["#4A5568", "#2D3748", "#1A202C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-80 px-6 pt-12 pb-6 rounded-b-3xl"
                >
                    {/* Profile Image and Info */}
                    <TouchableOpacity 
                        className="flex-row items-start mb-8"
                        onPress={() => router.push("/profile/EditProfile")}
                    >
                        <Image
                            source={{ uri: profile.profileImage }}
                            className="w-20 h-20 rounded-full mr-4"
                        />
                        <View className="flex-1">
                            <Text className="text-white text-2xl font-bold mb-1">{profile.fullName}</Text>
                            <Text className="text-white/80 text-base">{profile.location}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Stats Cards */}
                    <View className="flex-row justify-between mb-4">
                        <View className="bg-white/90 rounded-2xl p-4 flex-1 mr-3">
                            <Text className="text-gray-600 text-sm mb-1">Rating</Text>
                            <Text className="text-black text-2xl font-bold mb-2">{profile.rating}</Text>
                            <View className="flex-row">{renderStars(profile.rating)}</View>
                        </View>

                        <View className="bg-white/90 rounded-2xl p-4 flex-1 ml-3">
                            <Text className="text-gray-600 text-sm mb-1">Projects</Text>
                            <Text className="text-black text-2xl font-bold mb-2">{profile.projects}</Text>
                            <Ionicons name="briefcase-outline" size={20} color="#666" />
                        </View>
                    </View>

                    {/* Edit Profile Button */}
                    <TouchableOpacity
                        className="absolute top-12 right-6 flex-row items-center"
                        onPress={() => router.push("/profile/EditProfileSections")}
                    >
                        <Text className="text-white text-base mr-2">Edit profile</Text>
                        <Ionicons name="pencil" size={20} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            {/* Content Sections */}
            <View className="px-6 py-6">
                {/* About Me */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="person-circle-outline" size={24} color="#FFA500" />
                        <Text className="text-xl font-bold text-gray-800 ml-3">About me</Text>
                    </View>
                    <Text className="text-gray-600 text-base leading-6">
                        {profile.aboutMe}
                    </Text>
                </View>

                {/* Education */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="school-outline" size={24} color="#FFA500" />
                        <Text className="text-xl font-bold text-gray-800 ml-3">Education</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-4 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-1">{profile.education[0]?.title}</Text>
                        <Text className="text-gray-600 text-base mb-1">{profile.education[0]?.institution}</Text>
                        <Text className="text-gray-500 text-sm">{profile.education[0]?.period}</Text>
                    </View>
                </View>

                {/* Resume */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="document-text-outline" size={24} color="#FFA500" />
                        <Text className="text-xl font-bold text-gray-800 ml-3">Resume</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
                        <View className="w-12 h-12 bg-red-500 rounded-lg items-center justify-center mr-4">
                            <Text className="text-white font-bold text-xs">PDF</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-semibold text-base mb-1">{profile.resume?.name}</Text>
                            <Text className="text-gray-500 text-sm">{profile.resume?.size} • {profile.resume?.date}</Text>
                        </View>
                    </View>
                </View>

                {/* Certificates */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="ribbon-outline" size={24} color="#FFA500" />
                        <Text className="text-xl font-bold text-gray-800 ml-3">Certificates</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
                        <View className="w-12 h-12 bg-red-500 rounded-lg items-center justify-center mr-4">
                            <Text className="text-white font-bold text-xs">PDF</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-semibold text-base mb-1">{profile.certificates[0]?.name}</Text>
                            <Text className="text-gray-500 text-sm">{profile.certificates[0]?.size} • {profile.certificates[0]?.date}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;