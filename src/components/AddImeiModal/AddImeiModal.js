import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { addImei } from '../../service/imei.service';

export const AddImeiModal = ({ imeiData, openAddImei, actionsAddImei }) => {
  const { user } = useContext(AuthContext);

  const [formImei, handleInputChange, cleanForm, setData]= useForm(imeiData)
  // {
  //   alias: '',
  //   imei: '',
  //   estado: ''
  // })
  useEffect(() => {
    setData(imeiData);
  }, [imeiData, setData]);


  const handleCloseAdd = () => {
    actionsAddImei({
      type: 'close',
      payload: {}
    })
  }

  const handleCLickAdd = async () => {

    const result = await addImei({ ...formImei, _id_user: user._id_user });

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
