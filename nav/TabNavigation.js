import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyAccountStack from './MyAccountStack';
import NotificationsStack from './NotificationsStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'My Account') {
            iconName = focused ? 'md-settings' : 'md-settings';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-mail' : 'ios-mail';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: '#fce181',
        inactiveTintColor: '#9fedd7',
        activeBackgroundColor: '#026670',
        inactiveBackgroundColor: '#026670'
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="My Account" component={MyAccountStack} />
      <Tab.Screen name="Notifications" component={NotificationsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
