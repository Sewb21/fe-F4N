import React, { Component, useState, useEffect } from 'react';
import { Overlay, Button } from 'react-native-elements';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import Firebase from '../firebase/firebase';

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
      .then(() => {
        toggleOverlay();
      })
      .catch(error => console.log(error));
  };

  if (visible) {
    return (
      <View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={styles.inputHeading}>{'Email'}</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={text =>
              handleTextChange('afawdry0@ox.ac.uk', 'email')
            }
          />
          <Text style={styles.inputHeading}>{'Password'}</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => handleTextChange('test123', 'password')}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogIn}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </Overlay>
      </View>
    );
  }

  return (
    <>
      <HeaderComponent name="Home" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('JobList')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go To Job List</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go to Add Job</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

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

export default HomeScreen;
