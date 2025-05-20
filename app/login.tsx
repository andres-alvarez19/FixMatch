import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>FixMatch</Text>
                <Text style={styles.subtitle}>Iniciar sesion</Text>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push({ pathname: '/login/form', params: {} })}
                >
                    <Text style={styles.buttonText}>Soy cliente</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push({ pathname: '/login/form', params: { specialist: 'true' } })}
                >
                    <Text style={styles.buttonText}>Soy especialista</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefdef',
    },
    topSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fefdef',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1a2a60',
    },
    subtitle: {
        fontSize: 24,
        color: '#13c6a0',
        fontWeight: 'bold',
        marginTop: 4,
    },
    bottomSection: {
        flex: 1,
        backgroundColor: '#ffaa2d',
        borderTopLeftRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: '#fedf70',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 40,
        width: '100%',
        marginBottom: 20,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
    },
});
