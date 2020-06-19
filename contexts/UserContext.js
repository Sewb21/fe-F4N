import React from 'react';

export const UserContext = React.createContext({
  authtoken: null,
  username: null,
  email: null,
});

export default UserContext;
