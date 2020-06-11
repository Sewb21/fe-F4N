import React from 'react';
import { View, Text } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import JobAdder from '../components/JobAdder';

const AddJobScreen = () => {
  return (
    <>
      <HeaderComponent name="Add Job" />
      <JobAdder />
    </>
  );
};

export default AddJobScreen;
