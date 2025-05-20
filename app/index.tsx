import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Landpage() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>FixMatch</Text>
                <Text style={styles.subtitle}>
                    Encuentra profesionales de confianza{"\n"}para el mantenimiento de tu hogar
                </Text>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
                    <Text style={styles.loginText}>Ya tengo una cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
                    <Text style={styles.registerText}>Soy nuevo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fefdef' },
    topSection: { flex: 2, alignItems: 'center', justifyContent: 'center' },
    logo: { width: 100, height: 100, marginBottom: 16, resizeMode: 'contain' },
    title: { fontSize: 36, fontWeight: 'bold', color: '#1a2a60', marginBottom: 12 },
    subtitle: { textAlign: 'center', fontSize: 16, color: '#1a2a60' },
    bottomSection: {
        flex: 1,
        backgroundColor: '#ffaa2d',
        borderTopLeftRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    loginButton: {
        backgroundColor: '#13c6a0',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 20,
        width: '100%',
    },
    loginText: { color: '#fff', fontSize: 18, textAlign: 'center' },
    registerButton: {
        backgroundColor: '#fedf70',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 40,
        width: '100%',
    },
    registerText: { color: '#000', fontSize: 18, textAlign: 'center' },
});
