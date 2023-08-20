// AddTask.js
import React, { useState, useContext } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';  // import uuid
import { TasksContext } from './TasksContext';

const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Grab the setTasks function from TasksContext
  const { setTasks } = useContext(TasksContext);

  const handleAddTask = () => {
    // Construct a new task
    const newTask = {
      id: uuid.v4(),  // Add unique ID to each new task
      title,
      time: `${startTime} - ${endTime}`,
      desc: 'Short task description', // You can add a field to allow users to input this
    };

    // Add the new task to the tasks array
    setTasks(currentTasks => [...currentTasks, newTask]);

    // Navigate back to the tasks screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Add a New Task</Text>

        <Text style={styles.inputLabel}>Task Title:</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Enter the task title"
            value={title}
            onChangeText={setTitle}
        />

        <Text style={styles.inputLabel}>Start Time:</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Enter start time" 
            value={startTime}
            onChangeText={setStartTime}
        />

        <Text style={styles.inputLabel}>End Time:</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Enter end time" 
            value={endTime}
            onChangeText={setEndTime}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleAddTask}>
          <Text style={styles.submitButtonText}>Add Task</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2833',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66FCF1',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    color: '#C5C6C7',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#45a29e',
    borderWidth: 1,
    marginBottom: 20,
    color: '#c5c6c7',
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#66FCF1",
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#1F2833',
  }
});

export default AddTask;
