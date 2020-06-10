import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderComponent from './HeaderComponent';

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <HeaderComponent name="Home" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('JobList')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go To Job List</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go to Add Job</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE5',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default HomeScreen;
