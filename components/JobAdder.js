import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import * as api from '../api-requests/axios-request';
import UserContext from '../contexts/UserContext';
import ImagePickerComponent from '../utils/imagePicker';

import jobImageUpload from '../api-requests/job-image-upload';
import Loader from '../components/Loader';
import { Picker } from '@react-native-community/picker';


export default function JobAdder() {
  const user = useContext(UserContext);

  const [jobInfo, setJobInfo] = useState({
    title: '',
    body: '',
    username: user.username,
    location: '',
  });
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    api
      .getSkills(user.authtoken)
      .then(({ skills }) => {
        setSkills(skills.map(skill => skill.skill_name).sort());
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleJobPost = () => {
    setLoading(true);
    api
      .postJob({ selectedSkill, ...jobInfo }, user.authtoken)
      .then(({ job_id }) => {

        if (image) {
          return jobImageUpload(image, job_id, user.authtoken);
        }
        return;
      })
      .then(() => {
        setImage(null);
        setLoading(false);
        setJobInfo({
          title: '',
          body: '',
          username: user.username,
          skill_name: '',
          location: '',
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleTextChange = (text, key) => {
    let updatedJobInfo = {};
    Object.assign(updatedJobInfo, jobInfo);
    updatedJobInfo[key] = text;
    setJobInfo(updatedJobInfo);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.blockContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{'Title'}</Text>
        </View>
        <View style={styles.titleInput}>
          <TextInput placeholder="Enter a title for you request..."
          onChangeText={text => handleTextChange(text, 'title')} />
        </View>
      </View>
      <View style={styles.blockContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{'Summary'}</Text>
        </View>
        <View style={styles.summaryInput}>
          <TextInput
          placeholder="Enter a summary of the work involved..."
            multiline={true}
            onChangetext={text => handleTextChange(text, 'body')}
          />
        </View>
      </View>
      <View style={styles.blockContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{'Skill Required'}</Text>
        </View>

        <Picker
          style={styles.skillPicker}
          selectedValue={selectedSkill}
          onValueChange={setSelectedSkill}
        >
          <Picker.Item label="Select a skill" value="" />
          {skills.map((skill, index) => {
            const skillLabel = skill[0].toUpperCase() + skill.slice(1);
            return <Picker.Item key={index} label={skillLabel} value={skill} />;
          })}
        </Picker>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.locationHeadingContainer}>
          <Text style={styles.headingText}>{'Location'}</Text>
        </View>
        <View style={styles.locationInput}>
          <TextInput placeholder="e.g M50"
            onChangeText={text => handleTextChange(text, 'location')}
          />
        </View>
        <View style={styles.pledgeHeadingContainer}>
          <Text style={styles.headingText}>{'Pledge'}</Text>
        </View>
        <View style={styles.pledgeInput}>
          <TextInput placeholder="e.g £25"
            onChangeText={text => handleTextChange(text, 'location')}
          />
        </View>
      </View>
            <View style={styles.button}>
        <ImagePickerComponent setImageObj={setImage}>
          <Text style={styles.buttonText}>Upload an Image</Text>
        </ImagePickerComponent>
      </View>
      <TouchableOpacity onPress={() => handleJobPost(jobInfo)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Post Job</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#e4f5f0',
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
  blockContainer: {
    marginTop: 3,
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 3,
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
  headingContainer: {
    paddingLeft: 10,
    backgroundColor: '#FEF9C7',
  },
  locationHeadingContainer: {
    paddingLeft: 10,
    backgroundColor: '#FEF9C7',
    width: '30%',
  },
  pledgeHeadingContainer: {
    paddingLeft: 10,
    backgroundColor: '#FEF9C7',
    width: '30%',
  },
  headingText: {
    fontSize: 20,
    color: '#026670',
  },
  titleInput: {
    height: 30,
    backgroundColor: '#FFFFFF',
    padding: 4,
  },
  summaryInput: {
    height: 80,
    backgroundColor: '#FFFFFF',
    padding: 4,
  },
  locationInput: {
    height: 30,
    backgroundColor: '#FFFFFF',
    padding: 4,
    width: '20%',
  },
  pledgeInput: {
    height: 30,
    backgroundColor: '#FFFFFF',
    padding: 4,
    width: '20%',
  },

  skillPicker: {
    backgroundColor: '#ffffff',
    height: 30,
  },
  skillPickerItem: {
    height: 30,
    color: 'red',
  },
};
