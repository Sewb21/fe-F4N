import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Firebase from '../firebase/firebase';
import { styles } from '../styling/LogInStyling';

export default function LogIn() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleTextChange = (text, key) => {
    let updatedUserInfo = {};
    Object.assign(updatedUserInfo, userInfo);
    updatedUserInfo[key] = text;
    setUserInfo(updatedUserInfo);
  };

  const handleLogIn = () => {
    const { email, password } = userInfo;
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => console.log(error));
  };

  return (
    <View>
      <Text style={styles.inputHeading}>{'Email'}</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={text => handleTextChange(text, 'email')}
      />
      <Text style={styles.inputHeading}>{'Password'}</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.inputBox}
        onChangeText={text => handleTextChange(text, 'password')}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
