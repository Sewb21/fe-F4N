import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import UserAdder from '../components/UserAdder';
import Loader from '../components/Loader';
import LogIn from '../components/LogIn';

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };
  const toggleLogIn = () => {
    setLogIn(!logIn);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  if (visible && signUp) {
    return <UserAdder toggleOverlay={toggleOverlay} setLoading={setLoading} />;
  }

  if (visible && logIn) {
    return <LogIn toggleOverlay={toggleOverlay} />;
  }

  if (visible) {
    return (
      <View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>Have you got an account?</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={toggleSignUp}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={toggleLogIn}
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

export default HomeScreen;
