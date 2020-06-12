import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9090',
});

// https://f4n.herokuapp.com

export const getSkills = authtoken => {
  return instance
    .get('/api/skills', { headers: { authtoken } })
    .then(({ data }) => {
      return data;
    });
};

export const postJob = (jobInfo, authtoken) => {
  return instance
    .post('/api/jobs', jobInfo, { headers: { authtoken } })
    .then(({ data }) => {
      console.log('posted', data.jobs);
    });
};

export const getJobs = authtoken => {
  return instance
    .get('/api/jobs', { headers: { authtoken } })
    .then(({ data }) => {
      return data;
    });
};

export const getSpecificJob = (jobID, authtoken) => {
  return instance
    .get(`/api/jobs/${jobID}`, { headers: { authtoken } })
    .then(({ data }) => {
      return data;
    });
};

export const getComments = (jobID, authtoken) => {
  return instance
    .get(`/api/jobs/${jobID}/comments`, { headers: { authtoken } })
    .then(({ data }) => {
      return data;
    });
};
