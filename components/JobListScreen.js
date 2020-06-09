import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import HeaderComponent from './HeaderComponent';
import { ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';
import getSkillImageLocation from '../utils/utils';

const JobListScreen = () => {
  const [jobList, setJobs] = useState([]);

  axios.get('https://f4n.herokuapp.com/api/jobs').then(({ data }) => {
    setJobs(data.allJobs);
  });

  return (
    <>
      <HeaderComponent name="Job List" />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {jobList.map((item) => {
            return (
              <ListItem
                containerStyle={styles.listitem}
                key={item.job_id}
                title={'"' + item.title + '"'}
                leftAvatar={<Avatar rounded icon={{ name: 'computer', color: 'black' }} />}
                chevron
              />
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
    backgroundColor: '#EDEAE5'
  },
  scrollView: {},
  listitem: {
    height: 100,
    margin: 1
  }
};

export default JobListScreen;
