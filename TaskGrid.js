import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskGrid = ({ numberOfTasks, id, onTasksChange }) => {
  const [tasks, setTasks] = useState(new Array(numberOfTasks).fill(false));

  // Load tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem(`tasks_${id}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, [id, numberOfTasks]);

  // Handle selection changes
  const handleSelection = async (index) => {
    const newTasks = [...tasks];
    newTasks[index] = !newTasks[index];
    setTasks(newTasks);

    // Save tasks to AsyncStorage
    await AsyncStorage.setItem(`tasks_${id}`, JSON.stringify(newTasks));

    // Notify parent component of task changes
    if (onTasksChange) {
      const progress = newTasks.filter(task => task).length / numberOfTasks;
      onTasksChange(progress);
    }
  };

  const checkboxesInRow = 4; // Change this to the number of checkboxes you want in a row
  const taskRows = [];
  for (let i = 0; i < tasks.length; i += checkboxesInRow) {
    taskRows.push(tasks.slice(i, i + checkboxesInRow));
  }

  return (
    <View>
      {taskRows.map((taskRow, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {taskRow.map((task, index) => {
            const actualIndex = rowIndex * checkboxesInRow + index;
            return (
              <View style={styles.checkboxContainer} key={actualIndex}>
                <Checkbox.Item
                  status={task ? 'checked' : 'unchecked'}
                  onPress={() => handleSelection(actualIndex)}
                  label={`${actualIndex + 1}`}
                />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Change this to 'center' if you want the row to be centered
  },
  checkboxContainer: {
    borderWidth: 1,
    borderColor: '#00FF9D',
    borderRadius: 5,
    margin: 2,
  },
});

export default TaskGrid;
