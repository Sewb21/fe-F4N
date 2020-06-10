import React from 'react';
import { View, Text } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';

const NotificationsScreen = () => {
  return (
    <>
      <HeaderComponent name="Notifications" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    </>
  );
};

export default NotificationsScreen;
