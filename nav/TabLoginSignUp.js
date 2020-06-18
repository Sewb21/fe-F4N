import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogIn from '../components/LogIn';
import UserAdder from '../components/UserAdder';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = focused ? 'md-log-in' : 'md-log-in';
          } else if (route.name === 'Sign Up') {
            iconName = focused ? 'md-person-add' : 'md-person-add';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#fce181',
        inactiveTintColor: '#9fedd7',
        activeBackgroundColor: '#026670',
        inactiveBackgroundColor: '#026670',
      }}
    >
      <Tab.Screen name="Login" component={LogIn} />
      <Tab.Screen name="Sign Up" component={UserAdder} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
