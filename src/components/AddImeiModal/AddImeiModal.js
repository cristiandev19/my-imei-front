import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React from 'react'
import { useForm } from '../../hooks/useForm';
import { addImei } from '../../service/imei.service';

export const AddImeiModal = ({ openAddImei, actionsAddImei }) => {

  const [formImei, handleInputChange, cleanForm]= useForm({
    alias: '',
    imei: '',
    estado: ''
  })


  const handleCloseAdd = () => {
    actionsAddImei({
      type: 'close',
      payload: {}
    })
  }

  const handleCLickAdd = async () => {

    const result = await addImei(formImei);
    console.log("🚀 ~ file: AddImeiModal.js ~ line 24 ~ handleCLickAdd ~ result", result)

    const { imei } = result;
    actionsAddImei({
      type: 'register',
      payload: {
        imeiData: imei
      }
    })
    cleanForm();
  }
  return (
    <>
      <Dialog open={openAddImei} onClose={handleCloseAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Registrate para asegurar tu IMEI</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="alias"
            name="alias"
            label="Ingrese el alias"
            type="text"
            fullWidth
            onChange={ handleInputChange }
            value={ formImei.alias }
          />
          <TextField
            autoFocus
            margin="dense"
            id="imei"
            name="imei"
            label="Ingrese el imei"
            type="text"
            fullWidth
            onChange={ handleInputChange }
            value={ formImei.imei }
          />
          <TextField
            autoFocus
            margin="dense"
            id="estado"
            name="estado"
            label="Ingrese el estado"
            type="text"
            fullWidth
            onChange={ handleInputChange }
            value={ formImei.estado }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary" >
            Cancelar
          </Button>
          <Button onClick={handleCLickAdd} color="primary" variant="outlined">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
