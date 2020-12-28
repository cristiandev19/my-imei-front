import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import React from 'react'
import { useForm } from '../../hooks/useForm';

export const RegisterModal = ({ openRegister, actionsRegister }) => {

  const [registerForm, handleInputChange] = useForm({
    names: '',
    email: '',
    password: ''
  })

  const handleCloseRegister = () => {
    actionsRegister({
      type: 'close',
      payload: {}
    })
  }

  const handleCLickRegister = () => {
    actionsRegister({
      type: 'register',
      payload: {
        formData: registerForm
      }
    })
  }

  return (
    <>
      <Dialog open={openRegister} onClose={handleCloseRegister} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Registrate para asegurar tu IMEI</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="names"
            name="names"
            label="Nombres"
            type="text"
            fullWidth
            onChange={ handleInputChange }
            value={ registerForm.names }
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            onChange={ handleInputChange }
            value={ registerForm.email }
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            onChange={ handleInputChange }
            value={ registerForm.password }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegister} color="primary" >
            Cancelar
          </Button>
          <Button onClick={handleCLickRegister} color="primary" variant="outlined">
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
