import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import UserContext from '../contexts/UserContext';
import DropDownPicker from 'react-native-dropdown-picker';

export default function JobAdder() {
  const [jobInfo, setJobInfo] = useState({
    title: 'hello world',
    body: 'foo bar',
    username: UserContext._currentValue,
    skill_name: 'computers',
    location: 'M12',
  });

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.inputHeading}>{'Title'}</Text>
      <TextInput style={styles.inputBox} />
      <Text style={styles.inputHeading}>{'Description'}</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.inputBox}
        //on change update state with info from inside the box
      />
      <Text style={styles.inputHeading}>{'Skills'}</Text>
      <DropDownPicker
        items={[
          { label: 'computers', value: 'computers' },
          { label: 'gardening', value: 'gardening' },
        ]}
        style={{ backgroundColor: '#fafafa' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
      />
      <Text style={styles.inputHeading}>{'Location'}</Text>
      <TextInput style={styles.inputBox} />
      <TouchableOpacity
        onPress={() =>
          console.log('sends a post request to the api with state')
        }
      >
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
  },
  inputHeading: {
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 10,
    color: '#026670',
    backgroundColor: '#FEF9C7',
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
  },
};
