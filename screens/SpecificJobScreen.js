import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import Loader from '../components/Loader';
import { elapsedTimeString } from '../utils/utils';
import HeaderComponent from '../components/HeaderComponent';
import CommentList from '../components/CommentList';
import UserContext from '../contexts/UserContext';
import * as api from '../api-requests/axios-request';
import { Avatar } from 'react-native-elements';

export default function SpecificJobScreen({ route }) {
  const user = useContext(UserContext);
  const [specificJob, setSpecificJob] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const jobID = route.params.job_id;

  useEffect(() => {
    api
      .getSpecificJob(jobID, user.authtoken)
      .then(({ job }) => setSpecificJob(job), setLoading(false));
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  const date = new Date(specificJob.created_at);
  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Details" />
      <Text style={styles.headingMain}>{' "' + specificJob.title + '"'}</Text>
      <Text style={styles.fieldTitle}>{'Description'}</Text>
      <Text style={styles.fieldBody}>{specificJob.body}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.rowC1}>{'Location'}</Text>
        <Text style={styles.rowC2}>{specificJob.location}</Text>
        <Text style={styles.rowC3}>{'User'}</Text>
        <Text style={styles.rowC4}>{specificJob.username}</Text>
        <View style={styles.rowC5}>
          <Avatar
            size="small"
            rounded
            source={{
              uri: specificJob.avatar_url,
            }}
            activeOpacity={0.7}
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowC1}>{'Pledge'}</Text>
        <Text style={styles.rowC2}>{'£25'}</Text>
        <Text style={styles.rowC6}>{'Posted'}</Text>
        <Text style={styles.rowC7}>{elapsedTimeString(date)}</Text>
      </View>
      <Text style={styles.fieldTitle}>{'Comments'}</Text>
      <CommentList jobID={jobID} />
    </View>
  );
}

const styles = {
  rowC8: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
    width: '75%',
  },
  rowC9: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
    width: '25%',
  },

  rowContainer: {
    flexDirection: 'row',
  },
  rowC1: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
    width: '25%',
  },
  rowC2: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '12.5%',
    marginTop: 5,
    paddingLeft: 10,
  },
  rowC3: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
    width: '17.5%',
  },
  rowC4: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '32.5%',
    marginTop: 5,
    paddingLeft: 10,
  },
  rowC5: {
    padding: 4,

    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '12.5%',
    marginTop: 5,
  },
  rowC6: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
    width: '22.5%',
  },
  rowC7: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '40%',
    marginTop: 5,
    paddingLeft: 10,
  },

  headingMain: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    paddingLeft: 10,
    fontWeight: 'bold',
  },

  fieldTitle: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
  },
  fieldBody: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
};
