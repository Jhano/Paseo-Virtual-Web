import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Typography  from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    root: {
        height: '18px', 
        width:'18px', 
        backgroundColor:'black', 
        transform: 'translate(-50%, -50%)', 
        borderRadius:'100%', 
        border:'2px solid white'
    },
    infoWindow: {
      display: 'flex',
      position: 'relative',
      bottom: '150px',
      left: '-45px',
      width: '220px',
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      padding: '10px',
      zIndex: '100px',
    }   
}));


const MarkerTemp = () => {
    const classes = useStyles();
    const {selectLocation} = useSelector(state => state.map);
    const {lat, lng} = selectLocation;
    return (
        <>
            <div className={classes.root} /> 

            <div className={classes.infoWindow}>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        <Typography >
                            {`Lat: ${lat}`}         
                        </Typography>
                        <Typography>
                            {`Lng: ${lng}`}
                        </Typography>
                    </div>
            </div>
        </>
                     
    );
}

export default MarkerTemp;
