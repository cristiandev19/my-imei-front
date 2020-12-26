import { Button, TextField } from '@material-ui/core';
import React from 'react'
import { useForm } from '../../hooks/useForm';

export const ProfileForm = ({ user, actionForm }) => {

  const { email, name } = user;
  const [formProfile, handleInputChange, cleanForm]= useForm({ email, name })

  const handleSave = () => {
    console.log('formProfile',  formProfile)
    actionForm({
      type: 'save',
      payload: {
        form: formProfile
      }
    })
  }

  return (
    <>
      <div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="text"
            fullWidth
            onChange={ handleInputChange }
            value={ formProfile.email }
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nombres"
            type="text"
            fullWidth
            onChange={ handleInputChange }
            value={ formProfile.name }
          />
        </div>

        <div>
          <Button onClick={handleSave} color="primary" variant="outlined">
            Guardar
          </Button>
        </div>
      </div>

    </>
  )
}
