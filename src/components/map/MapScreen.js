import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';


import { startLoadingModels } from '../../actions/model';
import Marker from './Marker';
import { mapStartUpdateModel, showAllModel, mapSelectModel } from '../../actions/map';
import BarraMenu from './BarraMenu';


const MapScreen = () => {

    const [mlat, setLat] = useState(0);
    const [mlng, setLng] = useState(0);

    const dispatch = useDispatch();
    const {selectModel} = useSelector(state => state.map)
    const {mId} = selectModel;

    useEffect(() => {
        dispatch(startLoadingModels());
    }, [dispatch]);

    const {models} = useSelector(state => state.model);

    const handleInfo = (mid, name) => {
        dispatch(mapSelectModel(mid, name));
    }

    const handleAllName = () => {    
        dispatch(mapSelectModel());
        dispatch(showAllModel());          
    }

    const handleDeleteLocation = () => {
        dispatch(mapStartUpdateModel(mId, {lat: 0, lng: 0}));
        dispatch(mapSelectModel());
    }

    const handleAddMarker = ({ x, y, lat, lng, event }) => {
        console.log(x, y, lat, lng, event );
        setLat(lat);
        setLng(lng);
    };

    const handleApiLoaded = (map, maps) => {
        console.log(map, maps)
    } 

    const getMapOptions = (maps) => ({
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
          gestureHandlin: 'none',
      });


    return (     
        <div style={{display: 'flex', flexDirection: 'column',height: '80vh', width:'100%', }}>
            <BarraMenu 
                handleAllName={handleAllName}
                handleDeleteLocation={handleDeleteLocation}
            />
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
                                        onClick={handleInfo}
                                        key={model.id}
                                        mId={model.id}
                                        name={model.data.name}
                                        lat={model.location.lat}
                                        lng={model.location.lng}
                                    />                           
                            ))                  
                }  
                
                    {/* <div style={{height: '18px', width:'18px', backgroundColor:'black', transform: 'translate(-50%, -50%)', borderRadius:'100%', border:'2px solid white' }}
                        lat={mlat}
                        lng={mlng}
                    >

                    </div> */}
                      
            </GoogleMapReact>
        </div>   
    )
}

export default MapScreen;
