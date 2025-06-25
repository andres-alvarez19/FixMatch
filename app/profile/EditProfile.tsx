import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function EditProfile() {
    const router = useRouter()
    const [fullName, setFullName] = useState("Brandone Louis")
    const [dateOfBirth, setDateOfBirth] = useState(new Date(1992, 7, 6)) // Aug 6, 1992
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [email, setEmail] = useState("Brandonelouis@gmail.com")
    const [countryCode, setCountryCode] = useState("1")
    const [phoneNumber, setPhoneNumber] = useState("619 3456 7890")
    const [location, setLocation] = useState("California, United states")

    const handleSave = () => {
        // Handle save logic here
        router.back()
    }

    const formatDate = (date: Date) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        return `${date.getDate().toString().padStart(2, "0")} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    return (
        <ScrollView className="flex-1 bg-[#FFFEF7]">
            {/* Header with gradient background */}
            <View className="relative">
                <View
                    className="h-96 px-6 pt-12 pb-6 rounded-b-3xl"
                    style={{
                        backgroundColor: "#4A5568", // Fallback para Nativewind
                    }}
                >
                    {/* Back Button */}
                    <TouchableOpacity className="absolute top-12 left-6 z-10" onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="white" />
                    </TouchableOpacity>

                    {/* Profile Image and Info */}
                    <View className="items-center mt-8">
                        <Image
                            source={{ uri: "https://randomuser.me/api/portraits/men/22.jpg" }}
                            className="w-24 h-24 rounded-full mb-4"
                        />
                        <Text className="text-white text-2xl font-bold mb-1">Orlando Diggs</Text>
                        <Text className="text-white/80 text-base mb-6">California, USA</Text>

                        {/* Change Image Button */}
                        <TouchableOpacity className="bg-white/20 rounded-xl px-6 py-3">
                            <Text className="text-white text-base font-medium">Change image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Form Fields */}
            <View className="px-6 py-6">
                {/* Full Name */}
                <View className="mb-6">
                    <Text className="text-gray-800 text-base font-semibold mb-2">Fullname</Text>
                    <TextInput
                        className="bg-gray-100 rounded-xl px-4 py-4 text-gray-700 text-base"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter your full name"
                    />
                </View>

                {/* Date of Birth */}
                <View className="mb-6">
                    <Text className="text-gray-800 text-base font-semibold mb-2">Date of birth</Text>
                    <TouchableOpacity
                        className="bg-gray-100 rounded-xl px-4 py-4 flex-row items-center justify-between"
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text className="text-gray-700 text-base">{formatDate(dateOfBirth)}</Text>
                        <Ionicons name="calendar-outline" size={24} color="#666" />
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false)
                                if (selectedDate) {
                                    setDateOfBirth(selectedDate)
                                }
                            }}
                        />
                    )}
                </View>

                {/* Email Address */}
                <View className="mb-6">
                    <Text className="text-gray-800 text-base font-semibold mb-2">Email address</Text>
                    <TextInput
                        className="bg-gray-100 rounded-xl px-4 py-4 text-gray-700 text-base"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Phone Number */}
                <View className="mb-6">
                    <Text className="text-gray-800 text-base font-semibold mb-2">Phone number</Text>
                    <View className="flex-row">
                        <View className="bg-gray-100 rounded-l-xl border-r border-gray-200" style={{ width: 80 }}>
                            <Picker selectedValue={countryCode} onValueChange={setCountryCode} style={{ height: 56 }}>
                                <Picker.Item label="1+" value="1" />
                                <Picker.Item label="44+" value="44" />
                                <Picker.Item label="33+" value="33" />
                                <Picker.Item label="49+" value="49" />
                            </Picker>
                        </View>
                        <TextInput
                            className="bg-gray-100 rounded-r-xl px-4 py-4 text-gray-700 text-base flex-1"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                {/* Location */}
                <View className="mb-8">
                    <Text className="text-gray-800 text-base font-semibold mb-2">Location</Text>
                    <TextInput
                        className="bg-gray-100 rounded-xl px-4 py-4 text-gray-700 text-base"
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Enter your location"
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity className="bg-yellow-400 rounded-xl py-4 items-center" onPress={handleSave}>
                    <Text className="text-black text-lg font-bold">SAVE</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
