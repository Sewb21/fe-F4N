import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabLoginSignUp from './nav/TabLoginSignUp';
import TabNavigation from './nav/TabNavigation';
import UserContext from './contexts/UserContext';
import { auth } from './firebase/firebase';
import * as api from './api-requests/axios-request';

const App = () => {
  const [userInfo, setUserInfo] = useState({
    authtoken: null,
    username: null,
    email: null,
  });

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        userAuth.getIdToken(true).then(idToken => {
          api
            .getUser(userAuth.email, idToken)
            .then(({ username }) => {
              setUserInfo({
                authtoken: idToken,
                uid: userAuth.uid,
                username,
                email: userAuth.email,
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
          email: null,
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

export default App;
