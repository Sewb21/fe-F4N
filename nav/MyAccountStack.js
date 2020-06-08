import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MyAccountScreen from '../components/MyAccountScreen';

const Stack = createStackNavigator();

const MyAccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
    </Stack.Navigator>
  );
};

export default MyAccountStack;
