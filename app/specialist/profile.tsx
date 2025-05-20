import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function SpecialistProfile() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.avatar}
            />

            <Text style={styles.name}>Ivan Arenas</Text>
            <Text style={styles.profession}>Plomero</Text>

            <View style={styles.ratingRow}>
                <FontAwesome name="star" size={18} color="#fbbf24" />
                <Text style={styles.ratingText}>4,8</Text>
                <Text style={styles.reviewCount}>(120 reseñas)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Acerca de</Text>
                <Text style={styles.description}>
                    Experimentado en el área residencial y comercial en plomería.
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Feather name="calendar" size={20} color="#008078" />
                <Text style={styles.infoText}>5 años de experiencia</Text>
            </View>

            <View style={styles.infoRow}>
                <Feather name="map-pin" size={20} color="#008078" />
                <Text style={styles.infoText}>Temuco</Text>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.messageText}>Mensaje</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reviewButton}>
                    <Text style={styles.reviewText}>Reseñas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#fefdef',
        flex: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 8,
    },
    profession: {
        fontSize: 18,
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingText: {
        marginLeft: 6,
        fontSize: 16,
        color: '#f59e0b',
    },
    reviewCount: {
        marginLeft: 6,
        fontSize: 14,
        color: '#444',
    },
    section: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
    },
    description: {
        fontSize: 15,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
    },
    infoText: {
        fontSize: 15,
        marginLeft: 10,
        color: '#222',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '100%',
    },
    messageButton: {
        backgroundColor: '#13c6a0',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 15,
        flex: 1,
        marginRight: 10,
    },
    reviewButton: {
        backgroundColor: '#fedf70',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 15,
        flex: 1,
        marginLeft: 10,
    },
    messageText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    reviewText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
});
