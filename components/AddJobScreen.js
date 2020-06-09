import React from "react";
import { View, Text } from "react-native";
import HeaderComponent from "./HeaderComponent";

const AddJobScreen = () => {
  return (
    <>
      <HeaderComponent name="Add Job" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Add Job!</Text>
      </View>
    </>
  );
};

export default AddJobScreen;
