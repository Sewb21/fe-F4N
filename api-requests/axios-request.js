import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://f4n.herokuapp.com',
});

export const getSkills = () => {
  return instance.get('/api/skills').then(({ data }) => {
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

export const getCharities = () => {
  return instance.get('/api/charities').then(({ data }) => {
    return data;
  });
};

export const postUser = (userInfo, avatarURL) => {
  console.log('post');
  return instance.post('/api/users', userInfo).then(({ data }) => {
    return data;
  });
};

export const getUser = (email, authtoken) => {
  console.log('get');
  return instance
    .get('/api/users', {
      params: {
        email,
      },
      headers: { authtoken },
    })
    .then(({ data: { users } }) => {
      return users[0];
    });
};

export const patchUser = (avatar_url, username) => {
  // return instance.patch('/api/users', avatar_url).then(({ data }) => {
  //   return data;
  // });
};
