import React, { useState, useContext } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { TasksContext } from './TasksContext';
import uuid from 'react-native-uuid';
import Tasks from './Tasks';

const Home = ({ navigation }) => {
    const [textInput, setTextInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const { setTasks } = useContext(TasksContext);
  
    const handleSubmit = () => {
      const prompt = `Generate a schedule for me for today in the following format: 'HH:MM-HH:MM Task Description'. This schedule should include: ${textInput}`;
      
      fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: prompt })
      })
      .then(response => response.json())
      .then(data => {
        // Split the AI response into lines
        const lines = data.result.split('\n');
    
        // For each line, parse out the start time, end time, and title
        const newTasks = lines.map(line => {
          const match = line.match(/(\d{2}:\d{2})-(\d{2}:\d{2}) (.+)/);
          if (match) {
            const startTime = match[1];
            const endTime = match[2];
            const title = match[3];
    
            // Return a new task object
            return {
              id: uuid.v4(),
              title,
              time: `${startTime} - ${endTime}`,
              desc: 'Generated by AI',  // placeholder description
            };
          } else {
            return null;
          }
        }).filter(task => task);  // Filter out nulls
    
        // Add the new tasks to the tasks array
        setTasks(currentTasks => [...currentTasks, ...newTasks]);
      })
      .catch(error => console.error(error));
    };
    
  
    return (
      <SafeAreaView style={styles.container}>
          <ScrollView>
              <Text style={styles.headerText}>Home Screen</Text>
              <TextInput
                  placeholder="Enter your text"
                  placeholderTextColor="#333"
                  value={textInput}
                  onChangeText={setTextInput}
                  style={styles.input}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit to AI</Text>
              </TouchableOpacity>
              <Text style={styles.aiResponse}>AI Response: {aiResponse}</Text>
              <Tasks navigation={navigation} />
          </ScrollView>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
              <Text style={styles.addTask}>+</Text>
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
  addButton: {
    position: 'absolute',
    margin: 16,
    right: 55,
    bottom: 0,
    backgroundColor: '#66FCF1',
    padding: 0,
    paddingHorizontal: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2F2C36',
  },
  button: {
    alignItems: "center",
    backgroundColor: '#00FF9D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  aiResponse: {
    color: '#fff',
    marginBottom: 20,
  },
  addTask: {
    fontSize:40,
    marginBottom:10,
  },
});

export default Home;