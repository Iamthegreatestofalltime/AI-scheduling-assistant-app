import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import TaskGrid from './TaskGrid';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConsistencyGoal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [goal, setGoal] = useState(null);

  const goalId = route.params.goalId;

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('goals');
        const goals = storedGoals ? JSON.parse(storedGoals) : [];
        const goal = goals.find((g) => g.id === goalId);
        setGoal(goal);
      } catch (e) {
        console.error(e);
      }
    };

    fetchGoal();
  }, [goalId]);

  const handleTasksChange = async (progress) => {
    // Update the progress field in AsyncStorage
    try {
      const storedGoals = await AsyncStorage.getItem('goals');
      let goals = storedGoals ? JSON.parse(storedGoals) : [];
      const goalIndex = goals.findIndex((g) => g.id === goalId);
      goals[goalIndex].progress = progress;

      // Save the updated goals array back to AsyncStorage
      await AsyncStorage.setItem('goals', JSON.stringify(goals));

      // Update the state
      setGoal({ ...goal, progress });
    } catch (e) {
      console.error(e);
    }
  };

  if (!goal) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{goal.name}</Text>
      <Text style={styles.subText}>Progress: {Math.round(goal.progress * 100)}%</Text>
      <TaskGrid numberOfTasks={goal.numberOfTasks} id={goal.id} onTasksChange={handleTasksChange} />
      <View style={styles.button}>
        <Button title="Go Back" onPress={() => navigation.goBack()} color="#1F1B24" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1B24',
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00FF9D',
    marginBottom: 20,
  },
  subText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#00FF9D',
    borderRadius: 5,
  }
});

export default ConsistencyGoal;
