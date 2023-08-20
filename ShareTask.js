// ShareTask.js
import React, { useState } from 'react';
import { Button, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native'; // import TouchableOpacity
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShareTask = ({ navigation, route }) => {
  const [email, setEmail] = useState('');

  const { task } = route.params; // Extract task from navigation parameters

  const handleBack = () => {
    navigation.goBack();
  }

  const handleShare = () => {
    // Handle the share functionality here
  }

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>{task.title}</Text>
        <TextInput
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleShare}>
            <Text>Share Task</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2833',
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
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
  button: {
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 500,
  }
});

export default ShareTask;
