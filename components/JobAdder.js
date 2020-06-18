import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as api from '../api-requests/axios-request';
import UserContext from '../contexts/UserContext';
import ImagePickerComponent from '../utils/imagePicker';
import jobImageUpload from '../api-requests/job-image-upload';
import Loader from '../components/Loader';

export default function JobAdder() {
  const user = useContext(UserContext);

  const [jobInfo, setJobInfo] = useState({
    title: '',
    body: '',
    username: user.username,
    skill_name: '',
    location: '',
  });
  const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    api
      .getSkills(user.authtoken)
      .then(({ skills }) => {
        setSkills(
          skills.map(skill => {
            return { label: skill.skill_name, value: skill.skill_name };
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleJobPost = () => {
    setLoading(true);
    api
      .postJob(jobInfo, user.authtoken)
      .then(({ job: { job_id } }) => {
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
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <Text style={styles.inputHeading}>{'Title'}</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={text => handleTextChange(text, 'title')}
      />
      <Text style={styles.inputHeading}>{'Description'}</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.inputBox}
        onChangeText={text => handleTextChange(text, 'body')}
      />
      <Text style={styles.inputHeading}>{'Skills'}</Text>
      <DropDownPicker
        items={skills}
        style={styles.dropDownPicker}
        dropDownStyle={styles.dropDownPickerDropDown}
        containerStyle={styles.dropDownContainer}
        activeItemStyle={styles.dropDownPickerItem}
        onChangeItem={item => handleTextChange(item.label, 'skill_name')}
      />
      <Text style={styles.inputHeading}>{'Location'}</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={text => handleTextChange(text, 'location')}
      />
      <ImagePickerComponent setImageObj={setImage}></ImagePickerComponent>
      <TouchableOpacity onPress={() => handleJobPost(jobInfo)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Post Job</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
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
  inputBox: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    padding: 4,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#026670',
    height: 40,
  },
  inputHeading: {
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 10,
    color: '#026670',
    backgroundColor: '#FEF9C7',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
  },
  dropDownPicker: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
  dropDownPickerDropDown: {
    backgroundColor: '#fff',
  },
  dropDownPickerItem: {
    fontSize: 14,
    color: '#026670',
  },
  dropDownContainer: {
    height: 50,
  },
};
