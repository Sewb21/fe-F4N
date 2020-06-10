import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import {Input} from 'react-native-elements';

export default function JobAdder() {
  return (
      <View style={{ flex: 1 }}>
        <TextInput placeholder={'Title'} style={styles.inputBox}/>
        <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder={'Job Info'}
        style={styles.inputBox}
      />
      <TextInput placeholder={'Skills'} style={styles.inputBox} />
      <TouchableOpacity onPress={() => console.log('This will call a func that adds job')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Post Job</Text>
        </View>
        </TouchableOpacity>
      </View>
  )
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
    height: 100,
    margin: 3,
    backgroundColor: '#fff',
    fontColor: '#026670',
    fontSize: 26,
  },
};
