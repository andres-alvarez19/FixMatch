import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import {useRouter} from "expo-router";

export default function CertificatesScreen() {
    const router = useRouter();
    const [certificates, setCertificates] = useState([
        { type: 'Plomería', file: null },
    ]);
    const [cv, setCv] = useState(null);

    const handleCertificateChange = (index, type) => {
        const newList = [...certificates];
        newList[index].type = type;
        setCertificates(newList);
    };

    const handleSelectCertificateFile = async (index) => {
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
        if (!result.canceled) {
            const updated = [...certificates];
            updated[index].file = result.assets[0];
            setCertificates(updated);
        }
    };

    const handleAddCertificate = () => {
        setCertificates([...certificates, { type: '', file: null }]);
    };

    const handleSelectCV = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
        if (!result.canceled) {
            setCv(result.assets[0]);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: '#fef8dd' }}>
            <View style={styles.container}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>FixMatch</Text>
                <Text style={styles.title}>
                    Agrega tus certificados y currículum para validar tu perfil profesional
                </Text>

                <View style={styles.box}>
                    <Text style={styles.sectionTitle}>Certificados</Text>
                    {certificates.map((item, index) => (
                        <View key={index} style={styles.certificateGroup}>
                            <Picker
                                selectedValue={item.type}
                                onValueChange={(value) => handleCertificateChange(index, value)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Plomería" value="Plomería" />
                                <Picker.Item label="Electricidad" value="Electricidad" />
                                <Picker.Item label="Gasfitería" value="Gasfitería" />
                                <Picker.Item label="Otro" value="Otro" />
                            </Picker>

                            <TouchableOpacity style={styles.uploadButton} onPress={() => handleSelectCertificateFile(index)}>
                                <Text style={styles.uploadText}>⬆ Seleccionar archivo</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.secondaryButton} onPress={handleAddCertificate}>
                        <Text style={styles.secondaryButtonText}>＋ Agregar otro certificado</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <Text style={styles.sectionTitle}>
                        Curriculum Vitae (opcional pero recomendado)
                    </Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleSelectCV}>
                        <Text style={styles.uploadText}>⬆ Seleccionar archivo</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                        router.push('/register/images');
                    }}>
                    <Text style={styles.submitText}>Guardar y continuar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        alignItems: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    logoText: {
        fontSize: 20,
        color: '#1a2a60',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 25,
        fontWeight: '500',
    },
    box: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: '#13c6a0',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    certificateGroup: {
        marginBottom: 10,
    },
    uploadButton: {
        backgroundColor: '#fedf70',
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 10,
    },
    uploadText: {
        textAlign: 'center',
        fontWeight: '500',
    },
    secondaryButton: {
        backgroundColor: '#fedf70',
        borderRadius: 12,
        paddingVertical: 12,
    },
    secondaryButtonText: {
        textAlign: 'center',
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#fedf70',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 20,
        width: '100%',
    },
    submitText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
});
