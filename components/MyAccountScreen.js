import React from 'react';
import { View, Text } from 'react-native';
import HeaderComponent from './HeaderComponent';

const MyAccountScreen = () => {
  return (
    <>
      <HeaderComponent name="My Account" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>My Account!</Text>
      </View>
    </>
  );
};

export default MyAccountScreen;
