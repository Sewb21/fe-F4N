import * as api from './axios-request';
import { storage } from '../firebase/firebase';

export default function avatarUploader(image, username, auth) {
  return fetch(image)
    .then(res => {
      return res.blob();
    })
    .then(blob => {
      storage
        .ref('users')
        .child(auth.user.uid + '/profile.jpg')
        .put(blob)
        .on(
          'state_changed',
          null,
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref('users')
              .child(auth.user.uid + '/profile.jpg')
              .getDownloadURL()
              .then(avatar_url => {
                api.patchUser(avatar_url, username).catch(err => {
                  console.log(err);
                });
              });
          }
        );
    });
}
