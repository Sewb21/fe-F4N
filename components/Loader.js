import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default function Loader({isLoading}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={isLoading}
        color="#026670"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#EDEAE5',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
};
