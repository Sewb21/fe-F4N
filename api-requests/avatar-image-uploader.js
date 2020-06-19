import * as api from './axios-request';
import { storage } from '../firebase/firebase';

export default function avatarUploader(image, username, uid) {
  return fetch(image)
    .then(res => {
      return res.blob();
    })
    .then(blob => {
      return storage
        .ref('users')
        .child(uid + '/profile.jpg')
        .put(blob);
    })
    .then(snapshot => {
      return snapshot.ref.getDownloadURL();
    })
    .then(avatar_url => {
      return api.patchUser(avatar_url, username);
    });
}
