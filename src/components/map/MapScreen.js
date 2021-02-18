import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';


import { startLoadingModels } from '../../actions/model';
import {mapSelectLocation, mapShowComboBox } from '../../actions/map';
import Marker from './Marker';
import BarraMenu from './BarraMenu';
import MarkerTemp from './MarkerTemp';
import { Grid } from '@material-ui/core';
import AddMarker from './AddMarker';


const MapScreen = () => {


    const dispatch = useDispatch();
    const {selectLocation, showComboBox} = useSelector(state => state.map)
    const {lat, lng} = selectLocation;

    useEffect(() => {
        dispatch(startLoadingModels());
    }, [dispatch]);

    const {models} = useSelector(state => state.model);

    const handleAddMarker = ({lat: mlat, lng: mlng}) => {
        dispatch(mapShowComboBox(true));
        dispatch(mapSelectLocation(mlat, mlng));
    };

    const handleApiLoaded = (map, maps) => {
        //console.log(map, maps)
    } 

    const getMapOptions = (maps) => ({
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
          disableDoubleClickZoom: true,
      });


    return (     
        <div style={{display: 'flex', flexDirection: 'column',height: '80vh', width:'100%', }}>        
                {
                    showComboBox ? 
                     <div style={{display: 'flex'}}>
                        <Grid item
                            xs={6} sm={6} md={6} lg={6} xl={6}
                        >
                            <AddMarker/>
                        </Grid>
                        <Grid item
                            xs={6} sm={6} md={6} lg={6} xl={6}
                        >
                            <BarraMenu />
                        </Grid>
                    </div>  
                    : <BarraMenu />
                   
                }
                
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE }}
                defaultZoom={10}
                defaultCenter={{ lat: -37.029739, lng:  -72.401045 }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}    
                onClick={handleAddMarker}
                options={getMapOptions}    
            >  
                {
                    models.map(model => (
                            (model.location.lat !== 0 || model.location.lng !== 0 )
                                &&
                                    <Marker
                                        key={model.id}
                                        mId={model.id}
                                        name={model.data.name}
                                        lat={model.location.lat}
                                        lng={model.location.lng}
                                    />                           
                            ))                
                } 
                {
                    (lat !== 0 || lng !== 0 ) 
                    &&
                    <MarkerTemp 
                        lat={lat}
                        lng={lng}
                    />
                } 
           
            </GoogleMapReact>
        </div>   
    )
}

export default MapScreen;
