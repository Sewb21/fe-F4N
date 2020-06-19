import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import * as api from '../api-requests/axios-request';
import LogOut from '../components/LogOut';
import UserContext from '../contexts/UserContext';
import Loader from '../components/Loader';
import ImagePickerComponent from '../utils/imagePicker';
import avatarUploader from '../api-requests/avatar-image-uploader';
import { styles } from '../styling/MyAccountScreenStyling';

const MyAccountScreen = () => {
  const user = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar_url: '',
    location: '',
    bio: '',
    charity_name: '',
    amount_raised: '',
  });
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getUser(user.email, user.authtoken)
      .then(userData => setUserDetails(userData), setLoading(false));
  }, [image]);

  const handleUserAvatarUpdate = () => {
    setLoading(true);
    avatarUploader(image, user.username, user.uid).then(() => {
      setImage(null);
      setLoading(false);
    });
  };

  if (isLoading) return <Loader isLoading={isLoading} />;
  return (
    <>
      <HeaderComponent name="My Account" />
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.image_view}></View>
          <ImagePickerComponent setImageObj={setImage}>
            <Image
              style={styles.userAvatar}
              source={{
                uri: userDetails.avatar_url,
              }}
            />
          </ImagePickerComponent>
          {image && (
            <TouchableOpacity onPress={handleUserAvatarUpdate}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Change avatar</Text>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'Username'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{userDetails.username}</Text>
          </View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'Email'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{userDetails.email}</Text>
          </View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'First Name'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{userDetails.first_name}</Text>
          </View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'Last Name'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{userDetails.last_name}</Text>
          </View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'Location'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{userDetails.location}</Text>
          </View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'Bio'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{userDetails.bio}</Text>
          </View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'Charity Name'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{userDetails.charity_name}</Text>
          </View>
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'Amount Raised'}</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>{'£' + userDetails.amount_raised}</Text>
          </View>
          <LogOut />
        </View>
      </ScrollView>
    </>
  );
};

export default MyAccountScreen;
