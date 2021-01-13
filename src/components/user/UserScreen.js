import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import  Avatar from '@material-ui/core/Avatar';
import  Typography from '@material-ui/core/Typography';
import  Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '3px 3px #0D0000',
        background: '#E9F1F7',
        width: '100%',
      },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
        marginBottom: theme.spacing(3),
    },
    label: {
      width: '100%',
      display: 'flex', 
      justifyContent: 'start'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: '60%'
    },
  }));

const UserScreen = () => {

    const classes = useStyles();
    return (

        <Grid container component="main" className={classes.root}>
                <div className={classes.paper}>
                    <Avatar 
                        className={classes.avatar}
                        alt="Imagen de usuario"
                        src='https://i.pinimg.com/originals/bf/e8/4f/bfe84fc4f0bea3c3efd1ed3b962be76f.jpg'
                    />
                    <Typography component="h1" className={classes.label} variant="h5">
                        Alejandro Figueroa
                    </Typography>
                    <Typography component="h1" className={classes.label} variant="h5">
                        Correo
                    </Typography>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Edit Perfil
                    </Button>
                </div>
        </Grid>
        
    );
}

export default UserScreen;
