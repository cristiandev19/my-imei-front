import { Button, Container, Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { CardIMEI } from '../CardIMEI/CardIMEI'
import { getImeisByPersona } from '../../service/imei.service';
import { useForm } from '../../hooks/useForm';
import { AddImeiModal } from '../AddImeiModal/AddImeiModal';
import { ACTIONS_CARD } from '../../types/card_types';
import { AuthContext } from '../../auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1)
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

  const { user } = useContext(AuthContext);

  // let array_card = ['item_add',0, 1, 2,3, 66, 6];

  const [cards, setCards] = useState([]);
  const [openAddImei, setOpenAddImei] = useState(false);
  const [form, handleInputChange] = useForm({
    filtro_imei: ''
  });

  const [imeiData, setImeiData] = useState({
    alias: '',
    imei: '',
    estado: ''
  })

  useEffect(() => {
  }, [form]);


  useEffect(() => {
    const fetchData = async () => {
      const dataImeis = await getImeisByPersona(user._id_user);
      setCards(dataImeis.imeis);
    };
    fetchData();
  }, []);


  const handleActionsAddImei = ({ type, payload }) => {
    switch (type) {
      case 'close':
        setOpenAddImei(false);
        setImeiData({
          alias: '',
          imei: '',
          estado: ''
        });
        break;

      case 'open':
        setOpenAddImei(true);
        setImeiData({
          alias: '',
          imei: '',
          estado: ''
        });
        break;

      case 'register':
        const { imeiData } = payload;
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
        setImeiData(payload.card_data);
        setOpenAddImei(true);

        break;
      default:
        break;
    }
  }

  return (
    <div>

      <Container fixed className={classes.main}>
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
          { [...cards].filter(card => filterCard(card))?.length === 0 && <div className="center">No hay registros</div> }
        </Grid>
      </Container>

      <AddImeiModal
        openAddImei={ openAddImei }
        actionsAddImei={ handleActionsAddImei }
        imeiData={ imeiData }
      />

    </div>
  )
}
