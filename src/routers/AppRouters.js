import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { HandleAuth } from '../components/HandleAuth/HandleAuth';
// import { HomeRoutes } from './HomeRoutes';
import { Home } from '../components/Home/Home';
import { HomeRouter } from './HomeRouter';
import { PrivateRouter } from './PrivateRouter';

export const AppRouter = () => {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <>
        <Switch>
          <PrivateRouter
            exact
            path="/home"
            component={ HomeRouter }
            isAuthenticated={ user?.logged }
          />
          <Route exact path="/auth" component={ HandleAuth } />
          <PrivateRouter
            exact
            path=""
            component={ HomeRouter }
            isAuthenticated={ user?.logged }
          />

          {/* <Route component={ HomeRouter } /> */}

        </Switch>
      </>
    </Router>
  );
};
