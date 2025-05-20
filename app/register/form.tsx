import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function RegisterForm() {
    const { specialist } = useLocalSearchParams();
    const isSpecialist = specialist === 'true';
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: '',
    });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fef8dd' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>FixMatch</Text>
                <Text style={styles.title}>Crear cuenta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    value={form.name}
                    onChangeText={text => handleChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefono"
                    keyboardType="phone-pad"
                    value={form.phone}
                    onChangeText={text => handleChange('phone', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={text => handleChange('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={form.password}
                    onChangeText={text => handleChange('password', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    value={form.confirmPassword}
                    onChangeText={text => handleChange('confirmPassword', text)}
                />

                <Text style={styles.label}>Sobre ti</Text>
                <TextInput
                    style={styles.textarea}
                    placeholder="Escribe una descripcion"
                    multiline
                    numberOfLines={4}
                    value={form.description}
                    onChangeText={text => handleChange('description', text)}
                />

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                        const destination = isSpecialist ? '/register/certificates' : '/register/images';
                        router.push(destination);
                    }}
                >
                    <Text style={styles.submitText}>Registrarse</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    logoText: {
        fontSize: 20,
        color: '#1a2a60',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    input: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: '#13c6a0',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    label: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },
    textarea: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: '#13c6a0',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        marginBottom: 30,
    },
    submitButton: {
        backgroundColor: '#fedf70',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignSelf: 'stretch',
    },
    submitText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
});
