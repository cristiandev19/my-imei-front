import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import React, { useState } from 'react'

export const LoginModal = ({ openLogin, actionsLogin }) => {

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name] : value
    });
  }

  const handleCloseLogin = () => {
    actionsLogin({
      type: 'close',
      payload: {}
    })
  }

  const handleCLickLogin = () => {
    actionsLogin({
      type: 'login',
      payload: {
        formData: loginForm
      }
    })

  }

  return (
    <>

      <Dialog open={openLogin} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ingresa a ver tus IMEIS</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            onChange={ handleChangeForm }
            value={ loginForm.email }
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            onChange={ handleChangeForm }
            value={ loginForm.password }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary" >
            Cancelar
          </Button>
          <Button onClick={handleCLickLogin} color="primary" variant="outlined">
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
