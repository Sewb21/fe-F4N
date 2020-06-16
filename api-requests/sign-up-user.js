import { auth, storage } from '../firebase/firebase';
import * as api from '../api-requests/axios-request';

const onPhotoUploadCompletion = (auth, userSkills, newUserInfo) => {
  storage
    .ref('users')
    .child(auth.user.uid + '/profile.jpg')
    .getDownloadURL()
    .then(avatar_url => {
      const { password, skill_name, ...userInfoNoPassword } = newUserInfo;
      console.log(newUserInfo);
      const userInfoPost = {
        avatar_url,
        skill_name: userSkills,
        ...userInfoNoPassword,
      };
      api.postUser(userInfoPost).catch(err => {
        console.log(err);
      });
    });
};

export const userSignUp = (newUserInfo, userSkills, image) => {
  const { email, password } = newUserInfo;
  return auth.createUserWithEmailAndPassword(email, password).then(auth => {
    fetch(image)
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const uploadPhoto = storage
          .ref('users')
          .child(auth.user.uid + '/profile.jpg')
          .put(blob);

        uploadPhoto.on(
          'state_changed',
          null,
          error => {
            console.log(error);
          },
          () => {
            onPhotoUploadCompletion(auth, userSkills, newUserInfo);
          }
        );
      });
  });
};
