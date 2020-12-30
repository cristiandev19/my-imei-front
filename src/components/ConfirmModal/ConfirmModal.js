import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { CONFIRM_ACTIONS } from '../../types/utils_types'

export const ConfirmModal = ({ infoConfirm, openConfirmModal, actionsConfirmModal  }) => {

  const handleCloseConfirm = () => {
    actionsConfirmModal({
      type: CONFIRM_ACTIONS.CANCEL,
      payload: {}
    })
  }

  const handleCLickConfirm = () => {
    console.log('infoConfirm', infoConfirm)
    
    actionsConfirmModal({
      type: CONFIRM_ACTIONS.CONFIRM,
      payload: {
        confirm: true,
        id_imei: infoConfirm.id_imei
      }
    })
  }

  return (
    <>
      <Dialog open={openConfirmModal} onClose={handleCloseConfirm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{ infoConfirm.title }</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <span>{ infoConfirm.msj }</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary" >
            Cancelar
          </Button>
          <Button onClick={handleCLickConfirm} color="primary" variant="outlined">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
