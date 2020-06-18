import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Home" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('JobList', { filteruser: false })}>
          <View style={styles.button1}>
            <Text style={styles.buttonText}>{'View Help Requests'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('JobList', { filteruser: true })
          }
        >
          <View style={styles.button2}>
            <Text style={styles.buttonText}>{'My Help Requests'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
          <View style={styles.button3}>
            <Text style={styles.buttonText}>{'Post New Help Request'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
          <View style={styles.button4}>
            <Text style={styles.buttonText}>{'Charity Sign Up'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f5f0',
    justifyContent: 'center',
    width: '100%',
  },
  button1: {
    backgroundColor: '#026670',
    alignItems: 'center',
    borderRadius: 7,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 2,
    marginRight: 2,
  },
  button2: {
    backgroundColor: '#026670',
    alignItems: 'center',
    borderRadius: 7,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2
  },
  button3: {
    backgroundColor: '#026670',
    alignItems: 'center',
    borderRadius: 7,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
  },
  button4: {
    backgroundColor: '#026670',
    alignItems: 'center',
    borderRadius: 7,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 20,
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
});

export default HomeScreen;
