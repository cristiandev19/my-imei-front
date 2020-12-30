

import React, { useContext } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem } from '@material-ui/core';
import { AuthContext } from '../../auth/AuthContext';
import { useHistory } from 'react-router-dom';
import { AUTH_TYPES } from '../../types/auth_types';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const HeaderHome = () => {

  const classes = useStyles();

  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    history.replace('/auth')

    dispatch({
      type: AUTH_TYPES.logout
    });

    // history
  }

  const handleGoHome = () => {
    history.replace('/home')
  }

  const clickProfile = () => {
    // history.replace('/profile')

    history.replace('/profile')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title} onClick={ handleGoHome } >
            MyIMEI
          </Typography>
          <Button onClick={ clickProfile } edge="end" color="inherit">
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            Cristian Sotomayor
          </Button>

          {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Open Menu
          </Button> */}
          {/* <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu> */}
          <Button 
            edge="end" 
            color="inherit"
            onClick={ handleLogout }
          >
            Cerrar sesion
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
