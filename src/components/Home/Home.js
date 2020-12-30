import { Button, Container, Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { CardIMEI } from '../CardIMEI/CardIMEI'
import { deleteImei, getImeisByPersona } from '../../service/imei.service';
import { useForm } from '../../hooks/useForm';
import { ACTIONS_CARD } from '../../types/card_types';
import { AuthContext } from '../../auth/AuthContext';
import { ActionsImeiModal } from '../ActionsImeiModal/ActionsImeiModal';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { CONFIRM_ACTIONS } from '../../types/utils_types';
import { ACTIONS_IMEI } from '../../types/imei_types';

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
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [infoConfirm, setInfoConfirm] = useState({
    title: 'Esta seguro de que quiere eliminar este imei?',
    msj: 'Esta informacion no podra ser recuperada'
  });

  const [form, handleInputChange] = useForm({
    filtro_imei: ''
  });

  const [imeiData, setImeiData] = useState({
    alias: '',
    imei: '',
    estado: ''
  })
  const [typeActionModal, setTypeActionModal] = useState('')

  useEffect(() => {
  }, [form]);


  useEffect(() => {
    const fetchData = async () => {
      const dataImeis = await getImeisByPersona(user._id_user);
      console.log("🚀 ~ file: Home.js ~ line 71 ~ fetchData ~ dataImeis", dataImeis)
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
    setTypeActionModal(ACTIONS_IMEI.CREATE);
  }

  const handleActionCard = ({ type, payload }) => {
    switch(type) {
      case ACTIONS_CARD.EDIT_CARD:
        console.log("🚀 ~ file: Home.js ~ line 131 ~ handleActionCard ~ payload", payload)

        setImeiData(payload.card_data);
        setOpenAddImei(true);
        setTypeActionModal(ACTIONS_IMEI.UPDATE);
        break;
      case ACTIONS_CARD.DELETE_CARD:
        setOpenConfirmModal(true);
        setInfoConfirm({
          ...infoConfirm,
          id_imei: payload.id_imei
        })
        break;
      default:
        break;
    }
  }

  const actionsConfirmModal = async ({ type, payload }) => {
    console.log("🚀 ~ file: Home.js ~ line 134 ~ actionsConfirmModal ~ type", type)
    switch(type) {
      case CONFIRM_ACTIONS.CONFIRM:
        setOpenConfirmModal(false);
        const resDelete = await deleteImei(payload.id_imei);
        console.log("🚀 ~ file: Home.js ~ line 145 ~ actionsConfirmModal ~ resDelete", resDelete)
        const new_cards = cards.filter(card => card.id_imei !== payload.id_imei);
        setCards(new_cards);

        break;
      case CONFIRM_ACTIONS.CANCEL:


        setOpenConfirmModal(false);
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
            <Grid container item xs={12} justify="center" spacing={spacing}>
              {[...cards]
                .filter(card => filterCard(card))
                .map(({ id_imei, alias, imei, estado }) => (

                <Grid key={id_imei} item>
                  {/* <Paper className={classes.paper} /> */}
                  <CardIMEI
                    key={id_imei}
                    id_imei={id_imei}
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

      <ActionsImeiModal
        openAddImei={ openAddImei }
        actionsAddImei={ handleActionsAddImei }
        imeiData={ imeiData }
        typeAction={ typeActionModal }
      />
      <ConfirmModal
        openConfirmModal={ openConfirmModal }
        actionsConfirmModal={ actionsConfirmModal }
        infoConfirm={ infoConfirm }

      />
    </div>
  )
}
