import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Firebase from '../firebase/firebase';
import DropDownPicker from 'react-native-dropdown-picker';

export default function LogOut() {
  const handleLogOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        // setVisible
      })
      .catch(error => console.log(error));
  };

  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Out!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 26,
  },
  buttonContainer: {
    backgroundColor: '#026670',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 6,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5,
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff',
  },
});
