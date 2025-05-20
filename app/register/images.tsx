import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {router} from "expo-router";

export default function ImagesScreen() {
    const [images, setImages] = useState<string[]>([]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const selected = result.assets.map((asset) => asset.uri);
            setImages([...images, ...selected]);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: '#fef8dd' }}>
            <View style={styles.container}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>FixMatch</Text>
                <Text style={styles.title}>Sube tus fotos</Text>

                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadText}>⬆ Seleccionar archivo</Text>
                </TouchableOpacity>

                <FlatList
                    data={images}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item }} style={styles.image} />
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.placeholderContainer}>
                            {[...Array(9)].map((_, index) => (
                                <View key={index} style={styles.placeholder} />
                            ))}
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                        router.push('/specialist/profile');
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    uploadButton: {
        backgroundColor: '#fedf70',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: '#13c6a0',
    },
    uploadText: {
        textAlign: 'center',
        fontWeight: '500',
    },
    imageContainer: {
        width: 90,
        height: 120,
        borderRadius: 12,
        margin: 5,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: '#13c6a0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    placeholder: {
        width: 90,
        height: 120,
        margin: 5,
        borderRadius: 12,
        backgroundColor: '#f1f1f1',
        borderWidth: 1.5,
        borderColor: '#13c6a0',
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
