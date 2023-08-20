// Settings.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const Settings = ({ navigation }) => {
  return (
    <View>
        <Text>Settings Screen</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default Settings;
