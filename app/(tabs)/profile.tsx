
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"


const ProfileScreen = () => {
    const router = useRouter()

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
                <View
                    className="h-80 px-6 pt-12 pb-6 rounded-b-3xl"
                    style={{
                        background: "linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1A202C 100%)",
                        backgroundColor: "#4A5568", // Fallback for React Native
                    }}
                >
                    {/* Profile Image and Info */}
                    <TouchableOpacity 
                        className="flex-row items-start mb-8"
                        onPress={() => router.push("/profile/EditProfile")}
                    >
                        <Image
                            source={{ uri: "https://randomuser.me/api/portraits/men/22.jpg" }}
                            className="w-20 h-20 rounded-full mr-4"
                        />
                        <View className="flex-1">
                            <Text className="text-white text-2xl font-bold mb-1">Orlando Diggs</Text>
                            <Text className="text-white/80 text-base">California, USA</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Stats Cards */}
                    <View className="flex-row justify-between mb-4">
                        <View className="bg-white/90 rounded-2xl p-4 flex-1 mr-3">
                            <Text className="text-gray-600 text-sm mb-1">Rating</Text>
                            <Text className="text-black text-2xl font-bold mb-2">4.5</Text>
                            <View className="flex-row">{renderStars(4.5)}</View>
                        </View>

                        <View className="bg-white/90 rounded-2xl p-4 flex-1 ml-3">
                            <Text className="text-gray-600 text-sm mb-1">Projects</Text>
                            <Text className="text-black text-2xl font-bold mb-2">50</Text>
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
                </View>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus id commodo egestas metus interdum dolor.
                    </Text>
                </View>

                {/* Education */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="school-outline" size={24} color="#FFA500" />
                        <Text className="text-xl font-bold text-gray-800 ml-3">Education</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-4 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-1">Information Technology</Text>
                        <Text className="text-gray-600 text-base mb-1">University of Oxford</Text>
                        <Text className="text-gray-500 text-sm">Sep 2010 - Aug 2013 • 5 Years</Text>
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
                            <Text className="text-gray-800 font-semibold text-base mb-1">Jamet kudasi - CV - UI/UX Designer</Text>
                            <Text className="text-gray-500 text-sm">867 Kb • 14 Feb 2022 at 11:30 am</Text>
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
                            <Text className="text-gray-800 font-semibold text-base mb-1">Jamet kudasi - CV - UI/UX Designer</Text>
                            <Text className="text-gray-500 text-sm">867 Kb • 14 Feb 2022 at 11:30 am</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;