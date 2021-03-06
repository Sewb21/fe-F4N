import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as api from '../api-requests/axios-request';
import ImagePickerComponent from '../utils/imagePicker';
import { userSignUp } from '../api-requests/sign-up-user';
import Loader from './Loader';
import { styles } from '../styling/UserAdderStyling';
import HeaderComponent from './HeaderComponent';

export default function UserAdder() {
  const [newUserInfo, setNewUserInfo] = useState({
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
    skill_name: '',
    location: '',
    bio: '',
    charity_name: '',
  });
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [charities, setCharities] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .getSkills()
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

    api
      .getCharities()
      .then(({ charities }) => {
        setCharities(
          charities.map(charity => {
            return { label: charity.charity_name, value: charity.charity_name };
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleUserPost = () => {
    setLoading(true);
    userSignUp(newUserInfo, userSkills, image)
      .then(() => setLoading(false))
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleTextChange = (text, key) => {
    let updatedUserInfo = {};
    Object.assign(updatedUserInfo, newUserInfo);
    updatedUserInfo[key] = text;
    setNewUserInfo(updatedUserInfo);
  };

  if (loading) return <Loader />;

  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Sign Up" />
      <ScrollView>
        <Text style={styles.inputHeading}>{'Username'}</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => handleTextChange(text, 'username')}
        />
        <Text style={styles.inputHeading}>{'First Name'}</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => handleTextChange(text, 'first_name')}
        />
        <Text style={styles.inputHeading}>{'Last Name'}</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => handleTextChange(text, 'last_name')}
        />
        <Text style={styles.inputHeading}>{'email'}</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => handleTextChange(text, 'email')}
        />
        <Text style={styles.inputHeading}>{'password'}</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.inputBox}
          onChangeText={text => handleTextChange(text, 'password')}
        />
        <Text style={styles.inputHeading}>{'Charity Name'}</Text>
        <DropDownPicker
          items={charities}
          style={styles.dropDownPicker}
          dropDownStyle={styles.dropDownPickerDropDown}
          containerStyle={styles.dropDownContainer}
          activeItemStyle={styles.dropDownPickerItem}
          onChangeItem={item => handleTextChange(item.label, 'charity_name')}
          placeholder="Select a charity"
        />
        <Text style={styles.inputHeading}>{'Location'}</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => handleTextChange(text, 'location')}
        />
        <Text style={styles.inputHeading}>{'Bio'}</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => handleTextChange(text, 'bio')}
        />
        <Text style={styles.inputHeading}>{'Skills'}</Text>
        <DropDownPicker
          items={skills}
          style={styles.dropDownPicker}
          dropDownStyle={styles.dropDownPickerDropDown}
          containerStyle={styles.dropDownContainer}
          activeItemStyle={styles.dropDownPickerItem}
          placeholder="Select a skill"
          multiple={true}
          min={1}
          max={10}
          onChangeItem={item => setUserSkills(item)}
        />
        <View style={styles.button}>
          <ImagePickerComponent setImageObj={setImage}>
            <Text style={styles.buttonText}>Upload an Image</Text>
          </ImagePickerComponent>
        </View>
        <TouchableOpacity onPress={() => handleUserPost(newUserInfo)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Up!</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
