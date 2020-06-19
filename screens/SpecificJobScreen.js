import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Loader from '../components/Loader';
import { elapsedTimeString } from '../utils/utils';
import HeaderComponent from '../components/HeaderComponent';
import UserContext from '../contexts/UserContext';
import * as api from '../api-requests/axios-request';
import { Avatar } from 'react-native-elements';
import jobImageUpload from '../api-requests/job-image-upload';
import ImagePickerComponent from '../utils/imagePicker';

export default function SpecificJobScreen({ navigation, route }) {
  const user = useContext(UserContext);
  const [specificJob, setSpecificJob] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const job_id = route.params.job_id;

  useEffect(() => {
    api.getSpecificJob(job_id, user.authtoken).then(({ job }) => {
      setSpecificJob(job);
      setLoading(false);
    });
  }, [image]);

  const handleJobImageUpdate = () => {
    setLoading(true);
    jobImageUpload(image, job_id, user.authtoken).then(test => {
      setImage(null);
      setLoading(false);
    });
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  const date = new Date(specificJob.created_at);
  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Details" />
      <View style={styles.headingMain_view}>
        <Text style={styles.headingMain_text}>
          {':: "' + specificJob.title + '"'}
        </Text>
      </View>
      <View style={styles.fieldTitle_view}>
        <Text style={styles.fieldTitle_text}>{'Description'}</Text>
      </View>
      <View style={styles.fieldBody_view}>
        <Text style={styles.fieldBody_text}>{specificJob.body}</Text>
      </View>
      <View style={styles.rowContainerR1_view}>
        <View style={styles.rowC1_view}>
          <Text style={styles.rowC1_text}>{'Location'}</Text>
        </View>
        <View style={styles.rowC2_view}>
          <Text style={styles.rowC2_text}>{specificJob.location}</Text>
        </View>
        <View style={styles.rowC3_view}>
          <Text style={styles.rowC3_text}>{'User'}</Text>
        </View>
        <View style={styles.rowC4_view}>
          <Text style={styles.rowC4_text}>{specificJob.username}</Text>
        </View>
        <View style={styles.rowC5_view}>
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
      <View style={styles.rowContainerR2_view}>
        <View style={styles.rowC1_view}>
          <Text style={styles.rowC1_text}>{'Pledge'}</Text>
        </View>
        <View style={styles.rowC2_view}>
          <Text style={styles.rowC2_text}>{'£25'}</Text>
        </View>
        <View style={styles.rowC6_view}>
          <Text style={styles.rowC6_text}>{'Posted'}</Text>
        </View>
        <View style={styles.rowC7_view}>
          <Text style={styles.rowC7_text}>{elapsedTimeString(date)}</Text>
        </View>
      </View>
      <View style={styles.rowContainerR3_view}>
        <View style={styles.rowC8_view}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Comments', {
                job_id: job_id,
                title: specificJob.title,
              })
            }
          >
            <View style={styles.commentsButton_view}>
              <Text style={styles.commentsButton_text}>{'View Comments'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowC9_view}>
          {specificJob.username !== user.username && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Comments', {
                  job_id: job_id,
                  title: specificJob.title,
                })
              }
            >
              <View style={styles.helperButton_view}>
                <Text style={styles.helperButton_text}>{'Offer Help'}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {specificJob.job_image ? (
        <ImagePickerComponent setImageObj={setImage}>
          <Image
            style={{
              height: 100,
              width: 100,
              paddingLeft: 100,
              alignItems: 'center',
            }}
            source={{
              uri: specificJob.job_image,
            }}
          />
        </ImagePickerComponent>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleJobImageUpdate}>
          <ImagePickerComponent>
            <Text style={styles.buttonText}>Upload Image!</Text>
          </ImagePickerComponent>
        </TouchableOpacity>
      )}
      {image && (
        <TouchableOpacity onPress={handleJobImageUpdate}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Upload Image!</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = {
  image: {
    height: 100,
    width: 100,
    paddingLeft: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#026670',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 6,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 26,
  },
  rowC8_view: {
    width: '50%',
    padding: 2,
  },
  rowC9_view: {
    width: '50%',
    padding: 2,
  },
  commentsButton_view: {
    backgroundColor: '#026670',
    borderRadius: 7,
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    width: '100%',
    alignItems: 'center',
  },
  commentsButton_text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  helperButton_view: {
    backgroundColor: '#D10000',
    borderRadius: 7,
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    width: '100%',
    alignItems: 'center',
  },
  helperButton_text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowContainerR1_view: {
    flexDirection: 'row',
    height: 45,
    marginTop: 3,
  },
  rowContainerR2_view: {
    flexDirection: 'row',
    height: 29,
    marginTop: 3,
  },
  rowContainerR3_view: {
    flexDirection: 'row',
    height: 29,
    marginTop: 5,
  },

  rowC1_view: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    paddingLeft: 10,
    width: '27%',
    height: '100%',
    justifyContent: 'center',
  },
  rowC1_text: {
    fontSize: 20,
    color: '#026670',
  },
  rowC2_view: {
    paddingLeft: 5,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '10.5%',
    height: '100%',
    justifyContent: 'center',
  },
  rowC2_text: {
    fontSize: 14,
    color: '#026670',
  },
  rowC3_view: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    paddingLeft: 10,
    width: '17.5%',
    height: '100%',
    justifyContent: 'center',
  },
  rowC3_text: {
    fontSize: 20,
    color: '#026670',
  },
  rowC4_view: {
    padding: 4,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '32.5%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  rowC4_text: {
    fontSize: 14,
    color: '#026670',
  },
  rowC5_view: {
    padding: 4,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '12.5%',
    height: '100%',
    justifyContent: 'center',
  },
  rowC6_view: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    paddingLeft: 10,
    paddingBottom: 2,
    width: '22.5%',
    height: '100%',
    justifyContent: 'center',
  },
  rowC6_text: {
    fontSize: 20,
    color: '#026670',
  },
  rowC7_view: {
    paddingBottom: 2,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  rowC7_text: {
    fontSize: 14,
    color: '#026670',
  },

  headingMain_view: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    height: 40,
  },
  headingMain_text: {
    fontSize: 20,
    color: '#026670',
    fontWeight: 'bold',
  },
  fieldTitle_view: {
    backgroundColor: '#FEF9C7',
    paddingLeft: 10,
    height: 25,
    justifyContent: 'center',
    paddingBottom: 2,
  },
  fieldTitle_text: {
    fontSize: 20,
    color: '#026670',
  },
  fieldBody_view: {
    padding: 4,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    height: 60,
  },
  fieldBody_text: {
    fontSize: 14,
    color: '#026670',
  },
};
