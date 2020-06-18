import { auth, storage } from '../firebase/firebase';
import * as api from './axios-request';
import avatarUploader from './avatar-image-uploader';

export const userSignUp = (newUserInfo, userSkills, image) => {
  const {
    email,
    password,
    username,
    skill_name,
    ...userInfoNoPassword
  } = newUserInfo;
  const userInfoPost = {
    skill_name: userSkills,
    email,
    username,
    ...userInfoNoPassword,
  };

  return api
    .postUser(userInfoPost)
    .then(() => {
      return auth.createUserWithEmailAndPassword(email, password);
    })
    .then(auth => {
      if (image) {
        return avatarUploader(image, username, auth);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
