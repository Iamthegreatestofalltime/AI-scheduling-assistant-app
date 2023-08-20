import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { TasksContext } from './TasksContext';


const Tasks = ({ navigation }) => {
  const { tasks} = useContext(TasksContext);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    // Initialize checked states for new tasks
    const newChecked = { ...checked };
    tasks.forEach(task => {
      if (!newChecked[task.id]) {
        newChecked[task.id] = false;
      }
    });
    setChecked(newChecked);
  }, [tasks]);

  const handleCheck = id => {
    const newChecked = { ...checked, [id]: !checked[id] };
    setChecked(newChecked);
  };

  const handleShare = (task) => {
    navigation.navigate('ShareTask', { task });
  };

  const handleTaskSelect = (task) => {
    navigation.navigate('TaskDetails', { taskId: task.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.map((task) => (
          <TouchableOpacity key={task.id} onPress={() => handleTaskSelect(task)}>
            <View style={styles.taskCard}>
              <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.checkboxContainer} onPress={(e) => {e.stopPropagation(); handleCheck(task.id)}}>
                  <Ionicons name={checked[task.id] ? "checkmark-circle-outline" : "ellipse-outline"} size={24} color="#66FCF1" style={{ marginRight: 10 }}/>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightContainer}>
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward-outline" size={24} color="#45A29E"/>
                </View>
                <View style={styles.timeShareContainer}>
                  <Text style={styles.taskTime}>{task.time}</Text>
                  <TouchableOpacity onPress={(e) => {e.stopPropagation(); handleShare(task)}}>
                    <Ionicons name="share-outline" size={24} color="#45A29E"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );  
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#1F1B24',
    padding: 20,
    paddingBottom: 70,  // Adjust this as necessary to make space for the Add Task button
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0B0C10',
    borderRadius: 5,
    padding: 20,
    marginBottom: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Makes the container take all available space
  },  
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Allows wrapping of items inside the container
    flex: 1, // Makes the container take all available space
  },
  scrollView: {
    marginBottom: 50, // Adjust as necessary
  },
  taskTitle: {
    color: '#66FCF1',
    fontSize: 17,
    fontWeight: 'bold',
    flexShrink: 1, // Allows the text to shrink to avoid overflowing
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0, // Prevents these items from shrinking, preserving their space
  },
  taskTime: {
    color: '#C5C6C7',
    fontSize: 14,
  },
  taskDesc: {
    color: '#C5C6C7',
    fontSize: 14,
    marginTop: 5,
  },
  detailIcon: {
    color: '#45A29E',
  },
  arrowContainer: {
    width: 30, // Adjust as necessary
  },
  timeShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },  
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#66FCF1',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tasks;
