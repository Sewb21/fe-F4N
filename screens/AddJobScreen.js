import React from "react";
import { View, Text } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import JobAdder from '../components/JobAdder';
import UserContext from '../contexts/UserContext';


const AddJobScreen = () => {
  return (
    <>
      <UserContext.Consumer>
        {(value) => console.log(value)}
      </UserContext.Consumer>
      <HeaderComponent name="Add Job" />
      <JobAdder />
    </>
  );
};

export default AddJobScreen;
