import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const CompletionGoal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [goal, setGoal] = useState(null);

  const goalId = route.params.goalId;

  useEffect(() => {
    const fetchGoal = async () => {
      const storedGoals = await AsyncStorage.getItem('goals');
      const goals = storedGoals ? JSON.parse(storedGoals) : [];
      const foundGoal = goals.find(g => g.id === goalId);
      
      if (foundGoal) {
        setGoal(foundGoal);
      }
    };

    fetchGoal();
  }, [goalId]);

  const handleCompletion = async () => {
    const storedGoals = await AsyncStorage.getItem('goals');
    const goals = storedGoals ? JSON.parse(storedGoals) : [];

    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
      goals[goalIndex].progress = 1;
      goals[goalIndex].completed = true;

      await AsyncStorage.setItem('goals', JSON.stringify(goals));

      setGoal(goals[goalIndex]);
      
      Alert.alert("Success", "Goal completed!");
    }
  };

  if (!goal) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>{goal.name}</Text>
        <Text style={styles.progressText}>Progress: {Math.round(goal.progress * 100)}%</Text>
        <TouchableOpacity style={styles.button} onPress={handleCompletion}>
          <Text style={styles.buttonText}>Click me to complete</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1B24',
    padding: 20,
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00FF9D',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: '#00FF9D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: '#66FCF1',
    padding: 10,
    borderRadius: 5,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
  },
});

export default CompletionGoal;