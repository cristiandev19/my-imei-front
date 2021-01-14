import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/AuthContext';
// import { useForm } from '../../hooks/useForm';
import { addImei, updateImei } from '../../service/imei.service';
import { ACTIONS_IMEI } from '../../types/imei_types';
import { useForm } from 'react-hook-form';


const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
    maxWidth: '100%'
  }
}));


export const ActionsImeiModal = ({ typeAction, imeiData, openAddImei, actionsAddImei }) => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);
  console.log('🚀 ~ file: ActionsImeiModal.js ~ line 19 ~ ActionsImeiModal ~ imeiData', imeiData)
  // const [formImei, handleInputChange, cleanForm, setData]= useForm(imeiData)
  const { register, handleSubmit, errors } = useForm({
    mode: "all"

  });
  console.log('🚀 ~ file: ActionsImeiModal.js ~ line 25 ~ ActionsImeiModal ~ register', register)
  console.log('errors', errors)
  // const [formImei, handleInputChange, cleanForm, setData]= useForm(imeiData)

  // useEffect(() => {
  //   setData(imeiData)
  // }, [imeiData]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // setData(imeiData)
    console.log('errors', errors)
  }, [errors]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   console.log('formImei', formImei)
  //   // alias: "d"
  // // estado: ""
  // // imei: ""
  // }, [formImei])

  const handleCloseAdd = () => {
    actionsAddImei({
      type: 'close',
      payload: {}
    })
  }

  const handleCLickAdd = async () => {
    console.log('register', register)
    return ;
    // const result = await addImei({
    //   ...formImei,
    //   _id_user: user._id_user
    // });

    // const { imei } = result;
    // actionsAddImei({
    //   type: 'register',
    //   payload: {
    //     imeiData: imei
    //   }
    // })
    // cleanForm();
  }

  const handleCLickUpdate = async () => {
    return ;
    // const result = await updateImei({ ...formImei, id_imei: imeiData.id_imei });
    // console.log("🚀 ~ handleCLickUpdate ~ result", result)

  }

  const onSubmit = (data) => {
    console.log('data', data)
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl className={ classes.formControl }>
              <TextField
                autoFocus
                margin="dense"
                id="alias"
                name="alias"
                label="Ingrese el alias"
                type="text"
                fullWidth
                inputRef={register({required: true})}
              />
            </FormControl>
            <FormControl className={ classes.formControl }>
              <TextField
                margin="dense"
                id="imei"
                name="imei"
                label="Ingrese el imei"
                type="text"
                fullWidth
                inputRef={register({required: true, maxLength: 10 })}
              />
            </FormControl>
            <FormControl className={ classes.formControl }>
              <InputLabel id="select-state-label">Seleccione estado</InputLabel>
              <Select
                labelId="select-state-label"
                id="select-state"
                name="estado"
                inputProps={{
                  inputRef: (ref) => {
                    if (!ref) return;
                    register({
                      name: "estado",
                      value: ref.value,
                    });
                  },
                }}
              >
                <MenuItem value={1}>En mi poder</MenuItem>
                <MenuItem value={2}>Robado</MenuItem>
              </Select>
            </FormControl>
          </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary" >
            Cancelar
          </Button>
          {
            (typeAction === ACTIONS_IMEI.CREATE) && (
              <Button
                // onClick={handleCLickAdd}
                onClick={handleSubmit(onSubmit)}
                color="primary"
                variant="outlined"
                disabled={false}
              >
                Aceptar { JSON.stringify(errors) }
                {errors?.imei?.types?.required && <p>password required</p>}
              </Button>
            )
          }
          {
            (typeAction === ACTIONS_IMEI.UPDATE) && (
              <Button
                onClick={handleCLickUpdate}
                color="primary"
                variant="outlined"
              >
                Actualizar
              </Button>
            )
          }
        </DialogActions>
      </Dialog>
    </>
  )
}
