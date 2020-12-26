import { Button, Container, Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CardIMEI } from '../CardIMEI/CardIMEI'
import { getImeisByPersona } from '../../service/imei.service';
import { useForm } from '../../hooks/useForm';
import { AddImeiModal } from '../AddImeiModal/AddImeiModal';
import { ACTIONS_CARD } from '../../types/card_types';

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
    margin: '20px auto',
    display: 'flex'
  },
  main: {
    marginTop: '20px',
  }
}));

export const Home = () => {
  let spacing = 4;
  const classes = useStyles();

  
  // let array_card = ['item_add',0, 1, 2,3, 66, 6];

  const [cards, setCards] = useState([]);
  const [openAddImei, setOpenAddImei] = useState(false);
  const [form, handleInputChange] = useForm({
    filtro_imei: ''
  })

  useEffect(() => {
    console.log('cambio en form')
  }, [form]);

  const setDataCards = () => {

  }

  useEffect(() => {
    const fetchData = async () => {
      const dataImeis = await getImeisByPersona();
      console.log('dataImeis', dataImeis)
      setCards(dataImeis.imeis);
    };
    fetchData();
  }, []);


  const handleActionsAddImei = ({ type, payload }) => {
    switch (type) {
      case 'close':
        setOpenAddImei(false);
        break;

      case 'open':
        setOpenAddImei(true);
        break;

      case 'register':
        const { imeiData } = payload;
        console.log('quedan', [imeiData, ...cards])
        setCards([imeiData, ...cards]);
        setOpenAddImei(false);
        break;

      default:
        break;
    }
  }

  const filterCard = (card) => {
    if(!form?.filtro_imei.trim()) return true;
    return card.alias.includes(form?.filtro_imei);
  }

  const handleOpenAddModal = () => {
    setOpenAddImei(true);
  }

  const handleActionCard = ({ type, payload }) => {
    switch(type) {
      case ACTIONS_CARD.EDIT_CARD:
        console.log('hola  ', payload)
        break;
      default:
        break;
    }
  }

  return (
    <div>

      <Container fixed className={classes.main}>
        {/* Hola home */}
        <form className={classes.buscador} noValidate autoComplete="off">
          <Button 
            variant="contained" 
            color="secondary"
            onClick={handleOpenAddModal}
          >
            Agregar
          </Button>
          <TextField 
            fullWidth 
            variant="outlined" 
            id="filtro_imei"
            name="filtro_imei"
            label="Filtro..."
            type="text"
            onChange={ handleInputChange }
            value={ form.filtro_imei }
          />
        </form>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container  item xs={12} justify="center" spacing={spacing}>
              {[...cards]
                .filter(card => filterCard(card))
                .map(({ id, alias, imei, estado }) => (

                <Grid key={id} item>
                  {/* <Paper className={classes.paper} /> */}
                  <CardIMEI 
                    key={id} 
                    alias={alias} 
                    imei={imei} 
                    estado={estado} 
                    type_card="value"
                    actionCard={ handleActionCard }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          { [...cards].filter(card => filterCard(card))?.length === 0 && <h1>No hay registros</h1> }
        </Grid>
      </Container>

      <AddImeiModal
        openAddImei={ openAddImei }
        actionsAddImei={ handleActionsAddImei }
      />

    </div>
  )
}
