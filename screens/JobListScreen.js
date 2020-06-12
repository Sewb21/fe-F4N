import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import JobListItem from '../components/JobListItem';
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as api from '../api-requests/axios-request';
import UserContext from '../contexts/UserContext';

const JobListScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const [jobList, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.getJobs(user.authtoken).then(({ jobs }) => {
      setJobs(jobs), setLoading(false);
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
          {jobList.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SpecificJob', { job_id: item.job_id })
                }
              >
                <JobListItem key={item.job_id} item={item} />
              </TouchableOpacity>
            );
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
