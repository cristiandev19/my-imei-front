import { makeStyles, Snackbar } from '@material-ui/core';
import React, { useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { SNACKBAR_SEVERITY } from '../models/utils.model';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));


export const MySnackbar = ({
  msj,
  actionSnack,
  open = false,
  severity = SNACKBAR_SEVERITY.SUCCESS,
  duration = 3000
}) => {
  // const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    transition: SlideTransition
  });

  useEffect(() => {
    console.log('holaaa')
    setState({
      ...state,
      open
    });
    // effect
    // return () => {
    //   cleanup
    // }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = (event, reason) => {
    console.log('se esta cerrando', {event, reason})
    if (reason === 'clickaway') {
      return;
    }

    setState({
      ...state,
      open: false
    });
    actionSnack(false);
  };

  return (
    <>
      <Snackbar
        open={ state.open }
        autoHideDuration={ duration }
        onClose={ handleClose }
        TransitionComponent={state.Transition}
      >
        <Alert
          onClose={ handleClose }
          severity={ severity }
        >
          { msj }
        </Alert>

        {/* <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
        <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert> */}
      </Snackbar>
    </>
  );

}
