import * as api from '../api-requests/axios-request';
import { storage } from '../firebase/firebase';

export default function jobImageUpload(image, job_id, authtoken) {
  return fetch(image)
    .then(res => {
      return res.blob();
    })
    .then(blob => {
      return storage
        .ref('jobs')
        .child(job_id + '/job-image.jpg')
        .put(blob);
    })
    .then(snapshot => {
      return snapshot.ref.getDownloadURL();
    })
    .then(image_url => {
      return api.patchJob(job_id, image_url, authtoken);
    });
}
