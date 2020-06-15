import { auth, storage } from '../firebase/firebase';

const onPhotoUploadCompletion = () => {
  storage
    .ref('users')
    .child(auth.user.uid + '/profile.jpg')
    .getDownloadURL()
    .then(avatar_url => {
      const { password, skill_name, ...userInfoNoPassword } = newUserInfo;

      const userInfoPost = {
        avatar_url,
        skill_name,
        ...userInfoNoPassword,
      };

      api
        .postUser(userInfoPost)
        .then(res => {
          return console.log('this worked on server', res);
        })
        .catch(err => {
          console.log(err);
        });
    });
};

export const userSignUp = newUserInfo => {
  const { email, password } = newUserInfo;

  auth.createUserWithEmailAndPassword(email, password).then(auth => {
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
          onPhotoUploadCompletion
        );
      });
  });
};
