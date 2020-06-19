import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function ImagePickerComponent({ setImageObj, children }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageObj(result.uri);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
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
};
