import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import JobAdder from '../components/JobAdder';

const AddJobScreen = ({ navigation }) => {
  return (
    <>
      <HeaderComponent name="Post a New Request" />
      <JobAdder navigation={navigation} />
    </>
  );
};

export default AddJobScreen;
