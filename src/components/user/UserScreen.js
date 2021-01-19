import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserPerfil from './UserPerfil';
import UserEditPerfil from './UserEditPerfil';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
    paper: {
        margin: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },
  }));

const UserScreen = () => {

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
           <Grid item xs={12} md={12} lg={5}>
                <div className={classes.paper}>
                      <UserPerfil/>
                </div>
          </Grid>
          <Grid item xs={12} md={12} lg={7}>
                <div className={classes.paper}>
                    <UserEditPerfil/>
                </div>
          </Grid>
        </Grid>
    );
}

export default UserScreen;
