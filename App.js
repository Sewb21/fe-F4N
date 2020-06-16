import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './nav/TabNavigation';
import UserContext from './contexts/UserContext';
import { auth } from './firebase/firebase';
import * as api from './api-requests/axios-request';

const App = () => {
  const [userInfo, setUserInfo] = useState({
    loggedIn: false,
    firebaseUser: null,
    authtoken: null,
    username: null,
  });

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        userAuth.getIdToken(true).then(idToken => {
          api.getUser(userAuth.email, idToken).then(({ username }) => {
            setUserInfo({
              loggedIn: true,
              firebaseUser: userAuth,
              authtoken: idToken,
              username,
            });
          });
        });
      }

      if (!userAuth) {
        setUserInfo({
          loggedIn: false,
          firebaseUser: null,
          authtoken: null,
          username: null,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
