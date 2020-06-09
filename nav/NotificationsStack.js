import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from '../components/NotificationsScreen';

const Stack = createStackNavigator();

const NotificationsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default NotificationsStack;
