import { Button, makeStyles } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { SNACKBAR_SEVERITY } from '../../models/utils.model';
import { emailSignUp } from '../../service/auth.service';
import { AUTH_TYPES } from '../../types/auth_types';
import { MySnackbar } from '../../utils/MySnackbar';
import { LoginModal } from '../LoginModal/LoginModal';
import { RegisterModal } from '../RegisterModal/RegisterModal';


const useStyles = makeStyles((theme) => ({
  buttons: {
    width: '200px',
    marginTop: '5px',
    marginBottom: '5px'
  }
}));


export const HandleAuth = ({ history }) => {

  const { dispatch } = useContext(AuthContext);

  const classes = useStyles();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [snackBar, setSnackBar] = useState({
    msj: '',
    open: '',
    severity: SNACKBAR_SEVERITY.SUCCESS
  })

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };


  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };




  const handleActionsLogin = async ({ type, payload }) => {
    switch (type) {
      case 'close':
        setOpenLogin(false);
        break;

      case 'open':
        setOpenLogin(true);
        break;

      case 'login':
        const { formData } = payload;

        const userData = {}
        //   ...formData,
        //   name: 'Cristian'
        // }

        // return ;

        dispatch({
          type: AUTH_TYPES.login,
          payload: userData
        });

        // history.replace('/home')
        break;

      default:
        break;
    }
  }

  const handleActionsRegister = async ({ type, payload }) => {
    switch (type) {
      case 'close':
        setOpenRegister(false);
        break;

      case 'open':
        setOpenRegister(true);
        break;

      case 'register':
        const { formData } = payload;
        const response = await emailSignUp(formData);
        console.log('🚀 ~ file: HandleAuth.js ~ line 86 ~ handleActionsRegister ~ response', response)
        if (response.error) {
          setSnackBar({
            ...snackBar,
            open: true,
            msj: response.message,
            severity: SNACKBAR_SEVERITY.ERROR
          });
          return ;
        }

        dispatch({
          type: AUTH_TYPES.login,
          payload: response.user
        });
        setOpenRegister(false);
        history.replace('/home')
        break;

      default:
        break;
    }
  }

  const handleActionSnack = () => {
    setSnackBar({
      ...snackBar,
      open: false
    });
  }

  return (
    <div className="main-container">
      <div className="main-container__screen">
        {/* <img className="main-container__image" src={window.location.origin + '/phone_photo.jpg'} style="background-image: url('img_girl.jpg');" alt="Logo" />; */}
        <div
          className="screen-image"
          style={{ backgroundImage: `url(${window.location.origin + '/phone_photo.jpg'})`}}
          alt="Logo" ></div>
      </div>
      <div className="main-container__actions">
        <p>
          hola estas en HandleAuth
        </p>
        <Button
          variant="contained"
          className={classes.buttons}
          size="large"
          color="primary"
          onClick={handleClickOpenLogin}
        > Iniciar sesion</Button>
        <Button
          variant="contained"
          className={classes.buttons}
          size="large"
          color="secondary"
          onClick={handleClickOpenRegister}
        > Registrarse</Button>

        <LoginModal
          openLogin={ openLogin }
          actionsLogin={ handleActionsLogin }
        />
        <RegisterModal
          openRegister={ openRegister }
          actionsRegister={ handleActionsRegister }
        />

        <MySnackbar
          msj={ snackBar.msj}
          open={ snackBar.open}
          severity={ snackBar.severity}
          actionSnack={ handleActionSnack }
        />
      </div>
    </div>
  )
}
