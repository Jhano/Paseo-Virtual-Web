import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import { IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        color: 'red',      
    },
}));

const Marker = ({ name, onClick, isOpen,isModelName }) => {
    const classes = useStyles();

    return (
        <div style={{position: 'absolute'}}>
            <IconButton
                onClick={() => onClick(name)}
            >
            
                <RoomIcon fontSize="large"  className={classes.root}/>  
                {
                    isOpen &&
                    <Typography style={{color:'whitesmoke'}}>{name}</Typography>                
                }
            </IconButton>  
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