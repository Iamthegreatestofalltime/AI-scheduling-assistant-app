import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasksContext = React.createContext();

const initialTasks = [];

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.log('Error loading tasks from storage:', error);
      }
    };
    
    loadTasksFromStorage();
  }, []);

  // Save tasks to storage whenever they change
  useEffect(() => {
    const saveTasksToStorage = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.log('Error saving tasks to storage:', error);
      }
    };

    saveTasksToStorage();
  }, [tasks]);

    // task object should have the following structure: { id: unique-id, title: title, description: description }
    const createTask = (task) => {
        setTasks([...tasks, task]);
    };
    

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{ tasks, createTask, updateTask, deleteTask, setTasks }}>
        {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
