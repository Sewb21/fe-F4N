import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./nav/TabNavigation";
import UserContext from "./contexts/UserContext";
 

const App = () => {
  const [username, setUsername] = useState('jbugbirdy');
  
  return (
    <UserContext.Provider value={username}>
      <NavigationContainer>
        <TabNavigation/>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;