import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { styles } from '../styling/HomeScreenStyling';
import { Image } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Home" />
      <View style={styles.image}>
        <Image
          source={{
            uri:
              'https://filedn.com/lQJfVGhXSkSJSxgrjbFupmB/f4n_house_trans_300.png',
          }}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('JobList', { filteruser: false })}
        >
          <View style={styles.button1}>
            <Text style={styles.buttonText}>{'View Help Requests'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('JobList', { filteruser: true })}
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

export default HomeScreen;
