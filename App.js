import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabLoginSignUp from './nav/TabLoginSignUp';
import TabNavigation from './nav/TabNavigation';
import UserContext from './contexts/UserContext';
import { auth } from './firebase/firebase';
import * as api from './api-requests/axios-request';
import LogIn from './components/LogIn';

const App = () => {
  const [userInfo, setUserInfo] = useState({
    authtoken: null,
    username: null,
  });

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        userAuth.getIdToken(true).then(idToken => {
          api
            .getUser(userAuth.email, idToken)
            .then(({ username }) => {
              console.log(idToken);
              setUserInfo({
                authtoken: idToken,
                username,
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
      }

      if (!userAuth) {
        setUserInfo({
          authtoken: null,
          username: null,
        });
      }
    });
  }, []);

  if (!userInfo.authtoken) {
    return (
      <NavigationContainer>
        <TabLoginSignUp />
      </NavigationContainer>
    );
  }

  return (
    <UserContext.Provider value={userInfo}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </UserContext.Provider>
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

export default App;
