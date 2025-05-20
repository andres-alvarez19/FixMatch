import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    // Simulated user data
    const userName = 'Andrés';
    const isSpecialist = false;

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />

            <Text style={styles.title}>¡Hola, {userName}!</Text>
            <Text style={styles.subtitle}>
                {isSpecialist
                    ? 'Explora solicitudes de clientes cerca de ti'
                    : 'Publica tu problema y recibe ayuda rápida'}
            </Text>

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() =>
                    router.push(isSpecialist ? '/requests' : '/service/create')
                }
            >
                <Text style={styles.primaryText}>
                    {isSpecialist ? 'Ver solicitudes' : 'Crear solicitud'}
                </Text>
            </TouchableOpacity>

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push('/chat')}
                >
                    <Text style={styles.secondaryText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push('/profile')}
                >
                    <Text style={styles.secondaryText}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fef8dd',
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        marginBottom: 30,
    },
    primaryButton: {
        backgroundColor: '#13c6a0',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 15,
        marginBottom: 30,
    },
    primaryText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    secondaryButton: {
        backgroundColor: '#fedf70',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 12,
        marginHorizontal: 8,
    },
    secondaryText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
});
