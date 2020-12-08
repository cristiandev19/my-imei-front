import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export const CardIMEI = ({ alias, imei, estado, type_card }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="h2">
          Alias: { alias }
        </Typography>
        <Typography variant="body2" component="p">
          IMEI: { imei }
        </Typography>
        <Typography variant="body2" component="p">
          Estado: { estado }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Eliminar</Button>
        <Button size="small">Editar</Button>
      </CardActions>
    </Card>
  )
}
