import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="white"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="white"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2833',
    padding: 20,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#66fcf1',
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
    backgroundColor: "#66fcf1",
    padding: 10,
    borderRadius: 5,
  },
});

export default Login;
