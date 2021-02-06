import React, { createContext, useContext, useState } from 'react';
import API from '_helpers/api-helpers';
import { baseUrl } from '_services';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

function LoggedInUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    <UserStateContext value={user}>
      <UserDispatchContext value={setUser}>{children}</UserDispatchContext>
    </UserStateContext>
  );
}

function useUserStateContext() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    console.log('You must have a provider');
  }
  return context;
}
function useUserDispatchContext() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    console.log('You must have a provider');
  }
  return context;
}

function useUserContextHooks() {
  return [useUserStateContext(), useUserDispatchContext()];
}

async function apiAuthenticate(setUser, user, accessToken) {
  try {
    const response = await API.post(`${baseUrl}/sessions`, { accessToken });
    const account = response.data.user;
    return account;
  } catch (err) {
    console.error(err);
  }
}

export { LoggedInUserContextProvider, useUserContextHooks, apiAuthenticate };
