import React from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";

function HeaderComponent({ name }) {
  return (
    <Header
      leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: name, style: { color: "#fff" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
      containerStyle={styles.container}
    />
  );
}

const styles = {
  container: {
    backgroundColor: "#026670",
  },
};

export default HeaderComponent;
