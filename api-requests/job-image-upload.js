import * as api from '../api-requests/axios-request';
import { storage } from '../firebase/firebase';

export default function jobImageUpload(image, job_id, authtoken) {
  return fetch(image)
    .then(res => {
      return res.blob();
    })
    .then(blob => {
      storage
        .ref('jobs')
        .child(job_id + '/job-image.jpg')
        .put(blob)
        .on(
          'state_changed',
          null,
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref('jobs')
              .child(job_id + '/job-image.jpg')
              .getDownloadURL()
              .then(image_url => {
                api.patchJob(job_id, image_url, authtoken).catch(err => {
                  console.log(err);
                });
              });
          }
        );
    });
}
