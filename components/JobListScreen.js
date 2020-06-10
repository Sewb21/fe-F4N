import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import HeaderComponent from "./HeaderComponent";
import axios from "axios";
import JobListItem from './JobListItem'
import Loader from './Loader'

const JobListScreen = () => {
  const [jobList, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://f4n.herokuapp.com/api/jobs").then(({ data }) => {
      setJobs(data.allJobs),
      setLoading(false);
    });
  },[]);

  if (isLoading) {
    return <Loader isLoading={isLoading}/>;
  }
  return (
      <View style={styles.container}>
      <HeaderComponent name="Job List" />
        <ScrollView style={styles.scrollView}>
          {jobList.map((item) => {
            return (
             <JobListItem item={item}/>
            );
          })}
        </ScrollView>
      </View>
  );
  
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#EDEAE5'
  },
};

export default JobListScreen;
