import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button title="Go to Job List" onPress={() => navigation.navigate('JobList')} />
      <Button title="Go to Add Job" onPress={() => navigation.navigate('AddJob')} />
    </View>
  );
}

export default HomeScreen;
