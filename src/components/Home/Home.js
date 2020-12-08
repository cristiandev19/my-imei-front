import { Container, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { CardIMEI } from '../CardIMEI/CardIMEI'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  buscador: {
    width: '70%',
    margin: 'auto'
  },
  main: {
    marginTop: '20px',
  }
}));

export const Home = () => {
  let spacing = 4;
  const classes = useStyles();

  let array_card = ['item_add',0, 1, 2,3, 66, 6];
  return (
    <div>

      <Container fixed className={classes.main}>
        {/* Hola home */}

        <form className={classes.buscador} noValidate autoComplete="off">
          <TextField id="outlined-basic"  fullWidth label="Outlined" variant="outlined" />
        </form>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container  item xs={12} justify="center" spacing={spacing}>
              {array_card.map((value) => (

                <Grid key={value} item>
                  {/* <Paper className={classes.paper} /> */}
                  <CardIMEI key={value} alias="hola" imei="hola" estado="hola"  type_card="value"/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

    </div>
  )
}
