import React from 'react'
import { View, Text } from 'react-native'
import JobListScreen from '../components/JobListScreen';
import AddJobScreen from '../components/AddJobScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../components/HomeScreen";

const Stack = createStackNavigator();


const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="JobList" component={JobListScreen} />
      <Stack.Screen name="AddJob" component={AddJobScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack

