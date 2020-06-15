import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext({
  firebaseUser: null,
  username: null,
});

export default UserContext;
