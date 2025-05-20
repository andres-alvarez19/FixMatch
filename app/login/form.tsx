import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Iniciar sesión con:', email, password);
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.logoText}>FixMatch</Text>
            <Text style={styles.title}>Iniciar sesión</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="tu@email.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.loginButton}
                              onPress={() => {
                                  router.push('/home');
                                  handleLogin}}>
                <Text style={styles.loginText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                ¿No tienes una cuenta?{' '}
                <Text style={styles.registerLink} onPress={() => router.push('/register')}>
                    Regístrate
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fef8dd',
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 5,
    },
    logoText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#1a2a60',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 15,
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#13c6a0',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    loginButton: {
        backgroundColor: '#fedf70',
        borderRadius: 15,
        paddingVertical: 15,
        marginTop: 20,
    },
    loginText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
    footerText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#333',
    },
    registerLink: {
        color: '#13c6a0',
        fontWeight: '500',
    },
});
