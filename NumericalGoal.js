import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const NumericalGoal = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const goalId = route.params.goalId;
  const [goal, setGoal] = useState(null);
  const [progress, setProgress] = useState(0);

  const fetchGoal = async () => {
    try {
      const storedGoals = await AsyncStorage.getItem('goals');
      const goals = storedGoals ? JSON.parse(storedGoals) : [];
      const currentGoal = goals.find(goal => goal.id === goalId);
      setGoal(currentGoal);
    } catch (e) {
      console.error(e);
      console.error('Error fetching goal:', e);
    }
  };  

  useEffect(() => {
    fetchGoal();
  }, []);

  const handleUpdateProgress = async (newProgress) => {
    const updatedProgress = (goal.progress * goal.targetNumber + Number(newProgress)) / goal.targetNumber;
    const updatedGoal = { ...goal, progress: updatedProgress };
    const storedGoals = await AsyncStorage.getItem('goals');
    const goals = storedGoals ? JSON.parse(storedGoals) : [];
    const updatedGoals = goals.map(g => g.id === goalId ? updatedGoal : g);
    await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
    setGoal(updatedGoal);
  };
  

  if (!goal) {
    return null;  // or a loading indicator
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>{goal.title}</Text>
        <Text style={styles.progressText}>Progress: {Math.round((goal.progress / goal.targetNumber) * 100) || 0}%</Text>
        <TextInput
          style={styles.input}
          value={String(progress)} 
          onChangeText={setProgress}
          keyboardType="numeric" 
        />
        <TouchableOpacity style={styles.button} onPress={() => {
          handleUpdateProgress(progress);
          setProgress(0);
        }}>
          <Text style={styles.buttonText}>Update Progress</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
  input: {
    height: 40,
    borderColor: '#00FF9D',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    padding: 10,
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

export default NumericalGoal;
