import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import { TasksContext } from './TasksContext';

const TaskDetails = ({ navigation, route }) => {
  const { taskId } = route.params;
  const { tasks, updateTask, deleteTask } = useContext(TasksContext);

  // Find the task based on taskId
  const task = tasks.find(task => task.id === taskId);

  // If the task is not found, we are setting initial states to empty
  const [title, setTitle] = useState(task ? task.title : '');
  const [time, setTime] = useState(task ? task.time : '');
  const [desc, setDesc] = useState(task ? task.desc : '');
  const [completed, setCompleted] = useState(task ? task.completed : false);

  useEffect(() => {
    if(task && task.completed !== completed){
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSave = () => {
    // Check if task is not null
    if (task) {
      const updatedTask = {
        ...task,
        title,
        time,
        desc,
        completed,
      };

      // Call the updateTask function passed from Tasks screen
      updateTask(updatedTask);
    }

    // Navigate back to tasks list after updating
    navigation.goBack();
  };

  const handleDelete = () => {
    // Check if task is not null
    if (task) {
      // Call the deleteTask function passed from Tasks screen
      deleteTask(taskId);
    }

    // Navigate back to tasks list after deleting
    navigation.goBack();
  };

  const handleShare = () => {
    // Share task logic here
  };

  // If task is not found, display a loading indicator
  if (!task) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Details</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1B24',
    padding: 20,
  },
  header: {
    color: '#00FF9D',
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    height: 40,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2F2C36',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00FF9D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#1F1B24',
    fontSize: 18,
  },
});

export default TaskDetails;
