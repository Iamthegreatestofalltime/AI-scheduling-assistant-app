// Profile.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View>
        <Text>Profile Screen</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default Profile;
