import React, { useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { Nav, PrivateRoute } from '_components';
import { Login } from 'login/Login';
import NewPost from 'admin/NewPost';
import PostShowPage from 'posts/PostShowPage';
import PostIndex from 'posts/PostIndex';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const pathname = useLocation().pathname || '';

  const [isDark, toggleDark] = useState(false);

  const changeTheme = () => {
    toggleDark((prev) => !prev);
  };

  return (
    <div>
      <Nav isDark={isDark} changeTheme={changeTheme} />
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline>
          <div className='container pt-4'>
            <Switch>
              <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)} />
              <Route exact path='/' component={PostIndex} />
              <PrivateRoute path='/posts/:id/edit' component={NewPost} />
              <Route path='/posts/:id' component={PostShowPage} />
              <Route path='/login' component={Login} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export { App };
