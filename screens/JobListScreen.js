import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';
import JobListItem from '../components/JobListItem';
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const JobListScreen = ({ navigation }) => {
  const [jobList, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://f4n.herokuapp.com/api/jobs').then(({ data }) => {
      setJobs(data.jobs), setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <>
      <HeaderComponent name="Job List" />
      <View style={styles.container}>
        <ScrollView>
          {jobList.map(item => {
            return (
              <TouchableOpacity
                key={item.job_id}
                onPress={() =>
                  navigation.navigate('SpecificJob', { job_id: item.job_id })
                }
              >
                <JobListItem item={item} />
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
