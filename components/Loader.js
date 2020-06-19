import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from '../styling/LoaderStyling';

export default function Loader({ isLoading }) {
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
