import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { startLoadingModels, startUpdateModel } from '../../actions/model';
import Marker from './Marker';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(() => ({
    box: {
        border: '2px solid black',
        padding: '15px',
        height: '50px'
    },
}));

const MapScreen = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isModelName, setIsModelName] = useState(false);
    const [mId, setMId] = useState('');

    useEffect(() => {
        dispatch(startLoadingModels());
    }, [dispatch]);

    const {models} = useSelector(state => state.model);

    const handleInfo = (name, mid) => {
        setIsModelName(name);   
        setMId(mid)  
    }

    const handleAllName = () => {    
        setIsModelName('');  
        setIsOpen((current) => !current );             
    }

    const handleDeleteLocation = () => {
        dispatch(startUpdateModel(mId,{lat: '0', lng: '0'}))
        setMId('')  
    }

    const handleApiLoaded = (map, maps) => {     

    };

    const handleAddMarker = ({ x, y, lat, lng, event }) => {
        console.log(x, y, lat, lng, event );
    };

    return (     
        <div style={{display: 'flex', flexDirection: 'column',height: '80vh', width:'100%'}}>
            <div style={{display:'flex', justifyContent:'center', marginBottom: '15px'}}>
                <Grid xs={3} sm={3} md={3} lg={3} xl={3} item style={{display: 'flex', justifyContent:'flex-end'}}>
                    <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleAllName}
                            >
                            { isOpen ? <Visibility/> : <VisibilityOff /> }
                    </IconButton> 
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6} xl={6}  item>
                    <div className={classes.box}>
                        <Typography style={{textAlign: 'center'}}>{isModelName}</Typography> 
                    </div>
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} xl={3} style={{display: 'flex', justifyContent:'flex-start'}} item>
                    {
                        isModelName.length ?
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
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDrAodj56Ovg30O75OC6wUpghZr77mhCPs' }}
                defaultZoom={10}
                defaultCenter={{ lat: -37.029739, lng:  -72.401045 }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}    
                onClick={handleAddMarker}
            >  
                {
                    models.map(model => (
                            <Marker
                                    onClick={handleInfo}
                                    isOpen={isOpen}
                                    key={model.id}
                                    mId={model.id}
                                    name={model.data.name}
                                    lat={model.location.lat}
                                    lng={model.location.lng}
                                    isModelName={isModelName}
                            />              
                    ))                  
                }  
                
            </GoogleMapReact>
        </div>   
    )
}

export default MapScreen;
