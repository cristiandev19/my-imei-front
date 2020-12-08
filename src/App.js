// import logo from './logo.svg';
import './App.css';

import React, { useEffect, useReducer } from 'react';
import { AppRouter } from './routers/AppRouters';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';


const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged : false }
}

function App() {
  // const [user, setUser] = useState({});
  // const [user, setUser] = useState({});
  const [user, dispatch] = useReducer(authReducer, {}, init)

  useEffect(() => {

    localStorage.setItem( 'user', JSON.stringify(user) );
    // effect
    // return () => {
    //   cleanup
    // }
  }, [user])

  return (
    <AuthContext.Provider value={ { user, dispatch } } >
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
