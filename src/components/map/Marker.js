import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import { IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        color: 'red',  
        transform: 'translate(-50%, -50%)',     
    },
}));

const Marker = ({ name, onClick, isOpen, mId }) => {
    const classes = useStyles();

    return (
        <div style={{position: 'absolute'}}>
            <IconButton
                onClick={() => onClick(name, mId)}
            >
            
                <RoomIcon fontSize="large"  className={classes.root}/>  
            </IconButton>  
            {
                    isOpen &&
                    <Typography style={{color:'whitesmoke'}}>{name}</Typography>                
            }
        </div>
        
    )
     
};

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default Marker;