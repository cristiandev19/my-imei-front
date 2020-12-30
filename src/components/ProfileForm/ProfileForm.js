import { Button, TextField } from '@material-ui/core';
import React from 'react'
import { useForm } from '../../hooks/useForm';
import { PROFILE_ACTIONS } from '../../types/profile_types';

export const ProfileForm = ({ user, actionForm }) => {

  const { email, names } = user;
  const [formProfile, handleInputChange, cleanForm]= useForm({ email, names })

  const handleSave = () => {
    actionForm({
      type: PROFILE_ACTIONS.SAVE,
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
            id="names"
            name="names"
            label="Nombres"
            type="text"
            fullWidth
            onChange={ handleInputChange }
            value={ formProfile.names }
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
