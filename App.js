import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './nav/TabNavigation';
import UserContext from './contexts/UserContext';
import { auth } from './firebase/firebase';

const App = () => {
  const [userInfo, setUserInfo] = useState({
    firebaseUser: null,
    authtoken: null,
    username: null,
  });

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        userAuth.getIdToken(true).then(idToken => {
          setUserInfo({
            firebaseUser: userAuth,
            authtoken: idToken,
            username: 'jbugbirdy',
          });
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
