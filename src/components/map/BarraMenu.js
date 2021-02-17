import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(() => ({
    box: {
        border: '2px solid black',
        padding: '15px',
        height: '50px'
    },
}));

const BarraMenu = ({ handleAllName, handleDeleteLocation }) => {
    const classes = useStyles();

    const {selectModel, visible} = useSelector(state => state.map);
    const {modelName} = selectModel;
    return (
        <div style={{display:'flex', justifyContent:'center', marginBottom: '15px'}}>
                <Grid xs={3} sm={3} md={3} lg={3} xl={3} item style={{display: 'flex', justifyContent:'flex-end'}}>
                    <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleAllName}
                            >
                            { visible ? <Visibility/> : <VisibilityOff /> }
                    </IconButton> 
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6} xl={6}  item>
                    <div className={classes.box}>
                        <Typography style={{textAlign: 'center'}}>{modelName}</Typography> 
                    </div>
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} xl={3} style={{display: 'flex', justifyContent:'flex-start'}} item>
                    {
                        modelName.length ?
                        <IconButton
                            aria-label="Eliminar localización"
                            onClick={handleDeleteLocation}
                        >
                            <DeleteIcon style={{color: 'red'}}/>
                        </IconButton>
                        : ''
                    }
                </Grid>       
        </div>
    );
}

export default BarraMenu;
