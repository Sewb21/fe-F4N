import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Firebase from '../firebase/firebase';
import { styles } from '../styling/LogOutStyling';

export default function LogOut() {
  const handleLogOut = () => {
    Firebase.auth()
      .signOut()
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
