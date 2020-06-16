import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://f4n.herokuapp.com',
});

//
// http://localhost:9090

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
      console.log(data);
    });
};

export const getJobs = (authtoken, sortBy, order, location) => {
  let params = {};
  if (location !== '') {
    params = { sortBy, order, location };
  } else {
    params = { sortBy, order };
  }
  return instance
    .get('/api/jobs', {
      headers: { authtoken },
      params,
    })
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
