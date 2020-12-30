import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { addImei, updateImei } from '../../service/imei.service';
import { ACTIONS_IMEI } from '../../types/imei_types';


export const ActionsImeiModal = ({ typeAction, imeiData, openAddImei, actionsAddImei }) => {
  const { user } = useContext(AuthContext);

  const [formImei, handleInputChange, cleanForm, setData]= useForm(imeiData)
  // {
  //   alias: '',
  //   imei: '',
  //   estado: ''
  // })
  useEffect(() => {
    setData(imeiData)
  }, [imeiData]); // eslint-disable-line react-hooks/exhaustive-deps


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

  const handleCLickUpdate = async () => {
    const result = await updateImei({ ...formImei, id_imei: imeiData.id_imei });
    console.log("🚀 ~ file: ActionsImeiModal.js ~ line 48 ~ handleCLickUpdate ~ result", result)

    // const { imei } = result;
    // actionsAddImei({
    //   type: 'register',
    //   payload: {
    //     imeiData: imei
    //   }
    // })
    // const result = await addImei({ ...formImei, _id_user: user._id_user });

    // const { imei } = result;
    // actionsAddImei({
    //   type: 'register',
    //   payload: {
    //     imeiData: imei
    //   }
    // })
    // cleanForm();
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
          {
            (typeAction === ACTIONS_IMEI.CREATE) && (
              <Button onClick={handleCLickAdd} color="primary" variant="outlined">
                Aceptar
              </Button> 
            )
          }
          {
            (typeAction === ACTIONS_IMEI.UPDATE) && (
              <Button onClick={handleCLickUpdate} color="primary" variant="outlined">
                Actualizar
              </Button>
            )
          }
        </DialogActions>
      </Dialog>
    </>
  )
}
