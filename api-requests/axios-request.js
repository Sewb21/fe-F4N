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
      return data;
    });
};

export const getJobs = (
  authtoken,
  sortBy,
  order,
  username,
  job_status,
  location
) => {
  let params = { sortBy, order };
  if (location !== '' && location !== undefined) {
    params = { ...params, location };
  }
  if (username !== '' && username !== undefined) {
    params = { ...params, username };
  }
  if (job_status !== '' && job_status !== undefined) {
    params = { ...params, job_status };
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

export const getComments = (jobID, authtoken, sortBy, order, charity_name) => {
  let params = { sortBy, order };
  if (charity_name !== '' && charity_name !== undefined) {
    params = { ...params, charity_name };
  }
  return instance
    .get(`/api/jobs/${jobID}/comments`, {
      headers: { authtoken },
      params,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getCharities = () => {
  return instance.get('/api/charities').then(({ data }) => {
    return data;
  });
};

export const postUser = userInfo => {
  return instance.post('/api/users', userInfo).then(({ data }) => {
    return data;
  });
};

export const getUser = (email, authtoken) => {
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
  return instance
    .patch(`/api/users/${username}`, { avatar_url })
    .then(({ data }) => {
      return data;
    });
};

export const patchJob = (job_id, job_image, authtoken) => {
  return instance
    .patch(`/api/jobs/${job_id}`, { job_image }, { headers: { authtoken } })
    .then(({ data }) => {
      return data;
    });
};

export const postComment = (job_id, comment, authtoken) => {
  return instance.post(`/api/jobs/${job_id}/comments`, comment, {
    headers: { authtoken },
  });
};

export const getNotifications = (username, authtoken) => {
  return instance
    .get(`/api/users/${username}/notifications`, {
      headers: { authtoken },
    })
    .then(({ data }) => {
      return data;
    });
};

export const patchNotifications = (
  notification_id,
  status,
  username,
  authtoken
) => {
  return instance
    .patch(
      `/api/users/${username}/notifications/${notification_id}`,
      { status },
      { headers: { authtoken } }
    )
    .then(({ data }) => {
      return data;
    });
};

export const postHelpOffer = (username, job_id, authtoken) => {
  return instance.post(
    `/api/jobs/${job_id}/helpers`,
    { username },
    {
      headers: { authtoken },
    }
  );
};

export const postNotification = (username, body, authtoken) => {
  return instance
    .post(
      `/api/users/${username}/notifications`,
      { username, body },
      { headers: { authtoken } }
    )
    .then(({ data }) => {
      return data;
    });
};

export const getHelpersByJobId = (job_id, authtoken) => {
  return instance
    .get(`/api/jobs/${job_id}/helpers`, { headers: { authtoken } })
    .then(({ data }) => {
      return data;
    });
};

export const patchHelperStatus = (
  username,
  job_id,
  helper_status,
  authtoken
) => {
  return instance
    .patch(
      `/api/jobs/${job_id}/helpers`,
      {
        username,
        helper_status,
      },
      { headers: { authtoken } }
    )
    .then(({ data }) => {
      return data;
    });
};

export const patchJobStatus = (job_id, job_status, authtoken) => {
  return instance
    .patch(`/api/jobs/${job_id}`, { job_status }, { headers: { authtoken } })
    .then(({ data }) => {
      return data;
    });
};
