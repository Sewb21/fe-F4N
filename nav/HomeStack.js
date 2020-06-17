import React from 'react';
import JobListScreen from '../screens/JobListScreen';
import AddJobScreen from '../screens/AddJobScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SpecificJobScreen from '../screens/SpecificJobScreen';
import CommentsScreen from '../screens/CommentsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="JobList" component={JobListScreen} />
      <Stack.Screen name="AddJob" component={AddJobScreen} />
      <Stack.Screen name="SpecificJob" component={SpecificJobScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
