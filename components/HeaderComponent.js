import React from 'react';
import { Header } from 'react-native-elements';
import { styles } from '../styling/HeaderComponentStyling';

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

export default HeaderComponent;
