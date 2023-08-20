import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Some dummy data
const partners = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
    { id: '3', name: 'Test User' },
];

export default function AccountabilityPartner() {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.partnerItem}>
                <Text style={styles.partnerName}>{item.name}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton}>
                <Ionicons name='person-add-outline' size={20} color="#00FF9D" />
                <Text style={styles.addButtonText}>Add Partner</Text>
            </TouchableOpacity>
            <FlatList
                data={partners}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.accountabilityList}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F1B24',
        borderRadius: 50,
        padding: 10,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#00FF9D',
        marginLeft: 10,
    },
    accountabilityList: {
        maxHeight: '80%',
    },
    listContent: {
        paddingBottom: 10,
    },
    partnerItem: {
        backgroundColor: '#1F1B24',
        padding: 40,
        marginBottom: 5,
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#00FF9D',
    },
    partnerName: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
