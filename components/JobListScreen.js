import React from "react";
import { View, Text } from "react-native";
import HeaderComponent from "./HeaderComponent";

const JobListScreen = () => {
  return (
    <>
      <HeaderComponent name="Job List" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Job List!</Text>
      </View>
    </>
  );
};

export default JobListScreen;
