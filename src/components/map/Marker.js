import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import { IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { mapSelectModel } from '../../actions/map';

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        color: 'red',  
        transform: 'translate(-50%, -50%)',     
    },
}));

const Marker = ({ name, mId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {visible} = useSelector(state => state.map)
    
    const handleInfo = (mid, mName) => {
        dispatch(mapSelectModel(mid, mName));
    }

    return (
        <div style={{position: 'absolute'}}>
            <IconButton
                onClick={() => handleInfo(mId, name)}
            >
            
                <RoomIcon fontSize="large"  className={classes.root}/>  
            </IconButton>  
            {
                    visible &&
                    <Typography style={{color:'whitesmoke'}}>{name}</Typography>                
            }
        </div>
        
    )
     
};

export default Marker;