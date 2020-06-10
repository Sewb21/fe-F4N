import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';
import JobListItem from '../components/JobListItem';
import Loader from '../components/Loader';

const JobListScreen = () => {
  const [jobList, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://f4n.herokuapp.com/api/jobs').then(({ data }) => {
      setJobs(data.allJobs), setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <>
      
      <HeaderComponent name="Job List" />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {jobList.map((item) => {
            return <JobListItem key={item.job_id} item={item} />;
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FCE181',
    padding: 1,
  },
};

export default JobListScreen;
