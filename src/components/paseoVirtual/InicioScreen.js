import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import CardMenu from './CardMenu';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '15px',
        width: '100%'

    },
}));

const InicioScreen = () => {
    const classes = useStyles();
    const {name} = useSelector(state => state.user);

    return (
        <div className={classes.root}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src="../../assets/logo/logo.png" />
                <Typography style={{fontSize: '40px', marginBottom: '25px'}}> BIENVENIDO!! {name} </Typography>
            </div>   
            <Typography style={{fontSize: '25px', marginBottom: '15px'}}> Te encuentras en el sistema para administrar los modelos 3D.</Typography>
            <Grid container style={{display:'flex', justifyContent:'space-between', width:'80%'}}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CardMenu 
                        title="Perfil Usuario:"
                        screen='user'
                        description='Termine verificar tu información personal así como tambien te permite modificarla.'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CardMenu 
                        title="Modelos:"
                        screen='model'
                        description='Una tabla que permite ver la información de los modelos asi como tambien modificar dicha información o agregar nuevos modelos.'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CardMenu 
                        title="Map:"
                        screen='map'
                        description='Muestra un mapa donde puedes visualizar la localización de los modelos, tambien puedes agregar y eliminar nuevas localizaciones.'
                    />
                </Grid>
            </Grid>
            
        </div>
    );
}

export default InicioScreen;
