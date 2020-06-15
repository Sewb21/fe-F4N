import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as api from '../api-requests/axios-request';
import UserContext from '../contexts/UserContext';

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
    api.postJob(jobInfo, user.authtoken).catch(err => {
      console.log(err);
    });
  };

  const handleTextChange = (text, key) => {
    let updatedJobInfo = {};
    Object.assign(updatedJobInfo, jobInfo);
    updatedJobInfo[key] = text;
    setJobInfo(updatedJobInfo);
  };

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
