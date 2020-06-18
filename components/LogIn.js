import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Firebase from '../firebase/firebase';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
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
  inputBox: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    padding: 4,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#026670',
    height: 40,
  },
  inputHeading: {
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 10,
    color: '#026670',
    backgroundColor: '#FEF9C7',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
  },
});
