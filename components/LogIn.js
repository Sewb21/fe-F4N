import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Firebase from '../firebase/firebase';
import { styles } from '../styling/LogInStyling';
import HeaderComponent from './HeaderComponent';
import { Image } from 'react-native-elements';

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
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Welcome to F4N" />
      <View style={styles.image}>
        <Image
          source={{
            uri:
              'https://filedn.com/lQJfVGhXSkSJSxgrjbFupmB/f4n_house_trans_300.png',
          }}
          style={{ width: 300, height: 300 }}
        />
      </View>
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
