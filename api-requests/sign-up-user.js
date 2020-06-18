import { auth, storage } from '../firebase/firebase';
import * as api from './axios-request';
import { set } from 'react-native-reanimated';

export const userSignUp = (newUserInfo, userSkills, image) => {
  const { password, skill_name, ...userInfoNoPassword } = newUserInfo;
  const userInfoPost = {
    skill_name: userSkills,
    ...userInfoNoPassword,
  };

  return api
    .postUser(userInfoPost)
    .then(() => {
      return auth.createUserWithEmailAndPassword(email, password);
    })
    .then(auth => {
      if (image) {
        return avatarUploader(image, auth);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
