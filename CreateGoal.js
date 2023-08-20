import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateGoal = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('consistency');
    const [value, setValue] = useState('');
    const [targetNumber, setTargetNumber] = useState('');
    const [completed, setCompleted] = useState(false);
    const [targetDay, setTargetDay] = useState('');
    const [targetMonth, setTargetMonth] = useState('');
    const [targetYear, setTargetYear] = useState('');
    const [startDay, setStartDay] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endDay, setEndDay] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState('');
    const [numberOfTasks, setNumberOfTasks] = useState('');
    const [targetDuration, setTargetDuration] = useState('');
    const navigation = useNavigation();

    const isValidDate = (day, month, year) => {
        day = Number(day);
        month = Number(month);
      
        if (
          day >= 0 && day <= 31 &&
          month >= 0 && month <= 12 &&
          year.length === 4
        ) {
          return true;
        } else {
          return false;
        }
      };     
      
      const storeGoal = async (newGoal) => {
        try {
          const storedGoals = await AsyncStorage.getItem('goals');
          const goals = storedGoals ? JSON.parse(storedGoals) : [];
          
          goals.push(newGoal);
          await AsyncStorage.setItem('goals', JSON.stringify(goals));
          
          navigation.goBack();
        } catch (e) {
          console.error(e);
        }
      };

      const handleSubmit = () => {

        if (!isValidDate(targetDay, targetMonth, targetYear)) {
            alert("Invalid target date!");
            return;
          }
          
          if (type === 'duration' && 
             (!isValidDate(startDay, startMonth, startYear) || !isValidDate(endDay, endMonth, endYear))) {
            alert("Invalid start or end date!");
            return;
          }        
          let goalData = {
            id: uuid.v4(),
            name,
            description,
            type,
            targetDate: new Date(targetYear, targetMonth - 1, targetDay).toISOString(),
            progress: 0,
          };          
          
          switch (type) {
            case 'consistency':
              goalData.value = Boolean(value);
              goalData.numberOfTasks = Number(numberOfTasks); // Add numberOfTasks for consistency type
              break;
            case 'duration':
                goalData.startDate = new Date(startYear, startMonth - 1, startDay).toISOString(); // Start Date for duration type
                goalData.endDate = new Date(endYear, endMonth - 1, endDay).toISOString(); // End Date for duration type
                goalData.targetDuration = Number(targetDuration); // Add target duration for duration type
                break;
            case 'completion':
              goalData.completed = completed;
              goalData.numberOfTasks = 1; // Set numberOfTasks to 1 for completion type
              break;
            case 'numeric':
              goalData.targetNumber = Number(targetNumber);
              break;
            default:
              break;
          }          
    
        if (name && type) {
            storeGoal(goalData);
        }
    };

    return (
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
              <Text style={styles.title}>Create a New Goal</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Goal Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter goal name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
          
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Goal Type</Text>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                >
                    <Picker.Item label="Consistency" value="consistency" />
                    <Picker.Item label="Duration" value="duration" />
                    <Picker.Item label="Completion" value="completion" />
                    <Picker.Item label="Numeric" value="numeric" />
                </Picker>
                {type === 'consistency' && (
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Number of Tasks</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="Enter number of tasks"
                        value={numberOfTasks.toString()}
                        onChangeText={numberOfTasks => setNumberOfTasks(parseInt(numberOfTasks))}
                        keyboardType="numeric"
                        />
                    </View>
                    )}

              </View>
          
              <TextInput
                style={styles.input}
                placeholder="Number of tasks"
                keyboardType="numeric"
                value={numberOfTasks}
                onChangeText={setNumberOfTasks}
                />
          
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Target Date</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ ...styles.input, flex: 1 }}
                    placeholder="MM"
                    value={targetMonth}
                    onChangeText={setTargetMonth}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={{ ...styles.input, flex: 1 }}
                    placeholder="DD"
                    value={targetDay}
                    onChangeText={setTargetDay}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={{ ...styles.input, flex: 1 }}
                    placeholder="YYYY"
                    value={targetYear}
                    onChangeText={setTargetYear}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
              </View>
          
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Goal Description</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter goal description"
                  multiline
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
          
              {type === 'duration' && (
                    <>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Start Date</Text>
                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            style={{ ...styles.input, flex: 1 }}
                            placeholder="MM"
                            value={startMonth}
                            onChangeText={setStartMonth}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                        <TextInput
                            style={{ ...styles.input, flex: 1 }}
                            placeholder="DD"
                            value={startDay}
                            onChangeText={setStartDay}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                        <TextInput
                            style={{ ...styles.input, flex: 1 }}
                            placeholder="YYYY"
                            value={startYear}
                            onChangeText={setStartYear}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        </View>
                    </View>
      
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>End Date</Text>
                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            style={{ ...styles.input, flex: 1 }}
                            placeholder="MM"
                            value={endMonth}
                            onChangeText={setEndMonth}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                        <TextInput
                            style={{ ...styles.input, flex: 1 }}
                            placeholder="DD"
                            value={endDay}
                            onChangeText={setEndDay}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                        <TextInput
                            style={{ ...styles.input, flex: 1 }}
                            placeholder="YYYY"
                            value={endYear}
                            onChangeText={setEndYear}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        </View>
                    </View>
                            <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Target Duration (in minutes)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter target duration"
                            value={targetDuration.toString()}
                            onChangeText={targetDuration => setTargetDuration(parseInt(targetDuration))}
                            keyboardType="numeric"
                        />
                    </View>
                    </>
                )}

                {type === 'numeric' && (
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Target Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter target number"
                            value={targetNumber.toString()}
                            onChangeText={targetNumber => setTargetNumber(parseInt(targetNumber))}
                            keyboardType="numeric"
                        />
                    </View>
                )}

          
                <View style={styles.submitButton}>
                    <Button title="Create Goal" color="#1F7A8C" onPress={handleSubmit} />
                </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );         
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15212B',
    padding: 20,
  },
  title: {
    color: '#1F7A8C',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#253545',
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 60 : 20,
  },
});

export default CreateGoal;