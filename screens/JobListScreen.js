import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Picker } from 'react-native';
import { styles } from '../styling/JobListScreenStyling';
import HeaderComponent from '../components/HeaderComponent';
import JobListItem from '../components/JobListItem';
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as api from '../api-requests/axios-request';
import UserContext from '../contexts/UserContext';

const JobListScreen = ({ navigation, route }) => {
  const user = useContext(UserContext);
  const [jobList, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [locations, setLocations] = useState([]);
  const [filterLocation, setFilterLocation] = useState('');
  let filterUsername = '';
  if (route.params.filteruser) {
    filterUsername = user.username;
  }

  useEffect(() => {
    api
      .getJobs(user.authtoken, sortBy, order, filterUsername)
      .then(({ jobs }) => {
        setLocations(getUniqueLocations(jobs.map(job => job.location)));
      })
      .then(
        api
          .getJobs(
            user.authtoken,
            sortBy,
            order,
            filterUsername,
            filterLocation
          )
          .then(({ jobs }) => {
            setJobs(jobs);
            setLoading(false);
          })
          .catch(() => {
            setJobs([]);
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
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Job List" />
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
      {jobList.length === 0 && (
        <Text style={styles.fieldTitle}>You have no jobs</Text>
      )}
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
  );
};

export default JobListScreen;
