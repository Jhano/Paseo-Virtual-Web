import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { startLoadingModels } from '../../actions/model';
import Marker from './Marker';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    box: {
        border: '2px solid black',
        padding: '15px',
        width: '300px'
    },
}));

const MapScreen = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isModelName, setIsModelName] = useState(false);

    useEffect(() => {
        dispatch(startLoadingModels());
    }, [dispatch]);

    const {models} = useSelector(state => state.model);

    const handleInfo = (name) => {
        if(isOpen){
            setIsOpen((current) => !current );
            setIsModelName('');
        }else{
            setIsOpen((current) => !current );
            setIsModelName(name);
        }     
    }

    return (     
        <div style={{display: 'flex', flexDirection: 'column',height: '100vh', width:'100%'}}>
            <div style={{display:'flex', justifyContent:'center', marginBottom: '15px'}}>
                <div className={classes.box}>
                    <Typography>{isModelName}</Typography> 
                </div>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDrAodj56Ovg30O75OC6wUpghZr77mhCPs' }}
                defaultZoom={10}
                defaultCenter={{ lat: -37.029739, lng:  -72.401045 }}
             >  
                {
                    models.map(model => (
                            <Marker
                                    onClick={handleInfo}
                                    isOpen={isOpen}
                                    key={model.id}
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
