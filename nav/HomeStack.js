import React from "react";
import JobListScreen from "../screens/JobListScreen";
import AddJobScreen from "../screens/AddJobScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="JobList" component={JobListScreen} />
      <Stack.Screen name="AddJob" component={AddJobScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
