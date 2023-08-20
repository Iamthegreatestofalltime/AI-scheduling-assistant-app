import React from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalSetting = () => {
    const navigation = useNavigation(); // Initialize navigation
    const [goals, setGoals] = React.useState([]);

    const fetchGoals = async () => {
        try {
          const storedGoals = await AsyncStorage.getItem('goals');
          // Convert the stored object into an array of goals
          const goals = storedGoals ? Object.values(JSON.parse(storedGoals)) : [];
          setGoals(goals);
        } catch (e) {
          console.error(e);
        }
      };

      const deleteGoal = async (id) => {
        try {
          const storedGoals = await AsyncStorage.getItem('goals');
          let goals = storedGoals ? JSON.parse(storedGoals) : [];
          // Remove the goal with the specified id
          goals = goals.filter(goal => goal.id !== id);
          // Save the updated goals array back to storage
          await AsyncStorage.setItem('goals', JSON.stringify(goals));
          // Update the state
          setGoals(goals);
        } catch (e) {
          console.error(e);
        }
      };
      
      

    useFocusEffect(
        React.useCallback(() => {
        fetchGoals();
        }, [])
    );
  
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Your Goals</Text>
          {goals.map((goal, index) => (
            <TouchableOpacity 
                key={index}
                onPress={() => {
                    console.log(goal.type, goal.id);  // Debug line
                    if (goal.type === 'consistency') {
                        navigation.navigate('ConsistencyGoal', { goalId: goal.id });
                    } else if (goal.type === 'duration') {
                        navigation.navigate('DurationGoal', { goalId: goal.id });
                    } else if (goal.type === 'completion') {
                        navigation.navigate('CompletionGoal', { goalId: goal.id });
                    } else if (goal.type === 'numeric') {  // changed from 'numerical' to 'numeric'
                        navigation.navigate('NumericalGoal', { goalId: goal.id });
                    }                    
                  }}                  
            >
                <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>{goal.name}</Text>
                <ProgressBar progress={goal.progress} width={300} color={'#03A9F4'} unfilledColor={'#FFF'} borderWidth={0} />
                <Text style={styles.goalProgress}>{Math.round(goal.progress * 100)}%</Text>
                <Button title="Delete" onPress={() => deleteGoal(goal.id)} />
                </View>
            </TouchableOpacity>
            ))}
        </ScrollView>
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('CreateGoal')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  goalCard: {
    backgroundColor: '#303030',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  goalTitle: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 10,
  },
  goalProgress: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },
  fabText: {
    fontSize: 40,
    color: 'white'
  }
});

export default GoalSetting;