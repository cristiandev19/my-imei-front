import { Container, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { ProfileForm } from '../ProfileForm/ProfileForm';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  form: {
    width: '60%',
    margin: 'auto'
  }
}));

export const Profile = () => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);
  console.log("🚀 ~ file: Profile.js ~ line 32 ~ Profile ~ user", user)

  const handleActionForm = (data) => {
    console.log("🚀 ~ file: Profile.js ~ line 35 ~ actionForm ~ data", data)

  }
  return (
    <>
      <Container fixed className={classes.main}>

        <div className={classes.form}>
          <h2> Aqui puedes modificar tu informacion de perfil </h2>
          <ProfileForm user={ user } actionForm={ handleActionForm } />
        </div>
      </Container>
    </>
  )
}
