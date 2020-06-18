import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  NativeModules,
  Platform,
  StyleSheet,
  Picker,
} from 'react-native';

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
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [locations, setLocations] = useState([]);
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    api
      .getJobs(user.authtoken, sortBy, order)
      .then(({ jobs }) => {
        setLocations(getUniqueLocations(jobs.map(job => job.location)));
      })
      .then(
        api
          .getJobs(user.authtoken, sortBy, order, filterLocation)
          .then(({ jobs }) => {
            setJobs(jobs);
            setLoading(false);
          })
      );
  }, [filterLocation, order]);

  const getUniqueLocations = locations => {
    const sortFunction = (a, b) => {
      const intA = a
        .split('')
        .filter(x => !isNaN(Number.parseInt(x)))
        .join('');
      const intB = b
        .split('')
        .filter(x => !isNaN(Number.parseInt(x)))
        .join('');

      return intA - intB;
    };
    return locations
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort(sortFunction);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <>
      <HeaderComponent name="Job List" />
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.rowC1}>
            <Picker
              selectedValue={filterLocation}
              onValueChange={setFilterLocation}
            >
              <Picker.Item label="Location: (All)" value="" />
              {locations.map((loc, index) => {
                return <Picker.Item key={index} label={loc} value={loc} />;
              })}
            </Picker>
          </View>
          <View style={styles.rowC2}>
            <Picker selectedValue={order} onValueChange={setOrder}>
              <Picker.Item label="Posted: (newest)" value="desc" />
              <Picker.Item label="Posted: (oldest)" value="asc" />
            </Picker>
          </View>
        </View>

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
  },
  rowContainer: {
    backgroundColor: '#EDEAE5',
    flexDirection: 'row',
  },
  rowC1: {
    width: '48%',
    paddingLeft: 5,
  },
  rowC2: {
    width: '52%',
  },
};

export default JobListScreen;
