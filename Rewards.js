// Rewards.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const earnedAwards = [
    { id: 1, title: 'Early Bird', description: 'Completed a task before 8AM' },
    { id: 2, title: 'Night Owl', description: 'Completed a task after 10PM' },
    // ...more earned awards here...
]

const awardsInProgress = [
    { id: 3, title: 'Busy Bee', description: 'Complete 10 tasks in a day', progress: 50 },
    { id: 4, title: 'Task Master', description: 'Complete 100 tasks', progress: 80 },
    // ...more awards in progress here...
]

const Rewards = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Earned Awards</Text>
            <View style={styles.earnedAwardsContainer}>
                {earnedAwards.map(award => (
                    <TouchableOpacity style={styles.card} key={award.id} onPress={() => {/* handle click here to show more details or flip animation */}}>
                        <Text style={styles.cardTitle}>{award.title}</Text>
                        <Text style={styles.cardDescription}>{award.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <Text style={styles.title}>Awards In Progress</Text>
            {awardsInProgress.map(award => (
                <View key={award.id} style={styles.progressCard}>
                    <Text style={styles.cardTitle}>{award.title}</Text>
                    <Text style={styles.cardDescription}>{award.description}</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress, {width: `${award.progress}%`}]}></View>
                    </View>
                    <Text style={styles.progressText}>{award.progress}% complete</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#212121',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    earnedAwardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '45%', // for 2 cards per row, adjust based on the number of cards in a row
        backgroundColor: '#333',
        padding: 10,
        marginVertical: 10,
        borderRadius: 15,
    },
    progressCard: {
        backgroundColor: '#333',
        padding: 10,
        marginVertical: 10,
        borderRadius: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    cardDescription: {
        fontSize: 14,
        color: '#FFF',
    },
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: '#555',
        borderRadius: 10,
        marginTop: 10,
    },
    progress: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
    },
    progressText: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 10,
    },
});

export default Rewards;
