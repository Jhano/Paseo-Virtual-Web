import React, { useState } from 'react';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { mapSelectLocation, mapShowComboBox, mapStartUpdateModel } from '../../actions/map';
import { removeError, setError } from '../../actions/ui';



const AddMarker = () => {
    
    const dispatch = useDispatch();
    const {models} = useSelector(state => state.model);
    const [value, setValue] = useState(models[0]);
    const {selectLocation} = useSelector(state => state.map);
    const {msgError, validatedError} = useSelector(state =>  state.ui);
    const {lat, lng} = selectLocation;
    

    const handleComboBox = () => {
        dispatch(mapShowComboBox(false));
        dispatch(mapSelectLocation(0, 0));
    }

    const handleAddMarker = () => {
        
        if(value === null){
            dispatch(setError('Debe seleccionar un modelo'))
        } else{
            dispatch(removeError());
            dispatch(mapStartUpdateModel(value.id, {lat,lng}));
            dispatch(mapSelectLocation(0, 0));
        } 
    }

    return (
        <div style={{display:'flex', justifyContent:'center', marginBottom: '25px'}}>
            <Grid xs={3} sm={3} md={3} lg={3} xl={3} item style={{display: 'flex', justifyContent:'flex-end'}}>
                    <IconButton
                            aria-label="clear point"
                            onClick={handleComboBox}
                            >
                             <ClearIcon/> 
                    </IconButton> 
            </Grid>
            <Grid xs={6} sm={6} md={6} lg={6} xl={6}  item> 
                        <Autocomplete
                            id="combo-box"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            options={models}
                            style={{ height: '50px' }}
                            getOptionLabel={(option) => option.data.name}
                            getOptionSelected={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField 
                                    {...params} 
                                    label="Combo box" 
                                    variant="outlined" 
                                    error={msgError ? validatedError : false}
                                    helperText={msgError && msgError}
                                    />}
                        />
            </Grid>
            <Grid xs={3} sm={3} md={3} lg={3} xl={3} item style={{display: 'flex', justifyContent:'flex-start'}}>
                    <IconButton
                            aria-label="add location"
                            style={{color: 'green'}}
                            onClick={handleAddMarker}
                            >
                             <AddCircleIcon/> 
                    </IconButton> 
            </Grid>
        </div>
    );
}

export default AddMarker;
