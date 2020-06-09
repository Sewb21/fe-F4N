import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Header } from 'react-native-elements';

function HeaderComponent({ name }) {
  return (
    <Header
      leftComponent={{ text: ':: ' + name, style: styles.left }}
      rightComponent={{ icon: 'face', color: '#026670' }}
      containerStyle={styles.container}
      statusBarProps={{ translucent: true }}
    />
  );
}

const styles = {
  container: {
    backgroundColor: '#9FEDD7',
    justifyContent: 'space-around'
  },
  left: {
    color: '#026670',
    fontSize: 20,
    fontWeight: 'bold',
    width: 500,
    paddingRight: 200
  }
};

export default HeaderComponent;
