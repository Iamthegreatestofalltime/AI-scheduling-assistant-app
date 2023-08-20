// DurationGoal.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const DurationGoal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [goal, setGoal] = useState(null);
  const [input, setInput] = useState(''); // for handling user input

  const goalId = route.params.goalId;

  const getGoal = async () => {
    try {
      const storedGoals = await AsyncStorage.getItem('goals');
      const goals = storedGoals ? JSON.parse(storedGoals) : [];
      
      const currentGoal = goals.find((goal) => goal.id === goalId);
      
      if (currentGoal) {
        setGoal(currentGoal);
      } else {
        // handle no goal found
      }
    } catch (e) {
      // handle error
    }
  };

  const updateGoal = async () => {
    try {
      const newProgressInMinutes = goal.progress * goal.targetDuration + Number(input);
      const newProgressPercentage = newProgressInMinutes / goal.targetDuration;
      const storedGoals = await AsyncStorage.getItem('goals');
      const goals = storedGoals ? JSON.parse(storedGoals) : [];
  
      const updatedGoals = goals.map(g => {
        if (g.id === goalId) {
          return { ...g, progress: newProgressPercentage };
        } else {
          return g;
        }
      });
  
      await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
      setGoal(prevGoal => ({ ...prevGoal, progress: newProgressPercentage }));
      setInput('');
    }  catch (e) {
      // handle error
    }
  };

  useEffect(() => {
    getGoal();
  }, []);

  if (!goal) {
    // This could be a loading screen or a default view
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const startDate = new Date(goal.startDate).toLocaleDateString();
  const endDate = new Date(goal.endDate).toLocaleDateString();
  const durationProgress = (goal.progress / goal.targetDuration * 100).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>{goal.name}</Text>
        <Text style={styles.typeText}>Type: {goal.type}</Text>
        <Text style={styles.dateText}>Start Date: {startDate}</Text>
        <Text style={styles.dateText}>End Date: {endDate}</Text>
        <Text style={styles.durationText}>Target Duration: {goal.targetDuration} minutes</Text>
        <Text style={styles.progressText}>Progress: {durationProgress}%</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setInput}
          value={input}
          placeholder="Enter duration in minutes"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={updateGoal}>
          <Text style={styles.buttonText}>Update Progress</Text>
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
  typeText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  durationText: {
    fontSize: 18,
    color: '#fff',
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

export default DurationGoal;
