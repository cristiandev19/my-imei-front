import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { HeaderHome } from '../components/HeaderHome/HeaderHome';
import { Home } from '../components/Home/Home';
import { Profile } from '../components/Profile/Profile';

export const HomeRouter = ({ history }) => {



  return (
    <>
      <HeaderHome />
      <Switch>
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="" component={ Home } />

      </Switch>
    </>
  );
};
