import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableModels from './TableModels';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { searchModelsOff, startLoadingModels, startSearchModels } from '../../actions/model';
import { changeRowsPerPage, changeDesde, changeDesdeSearch, changeRowsPerPageSearch } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import ModalShowMore from './ModalShowMore';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginLeft: '40px',
        marginRight: '40px'
    },
    title: {
        marginBottom: '55px'
    },
    barra: {
        display: 'flex',
        justifyContent: ' space-between',
        padding: '10px',
        width: '100%'
    },
    input: {
        width: '60%',
        marginRight: '10px'
      },
    button: {
        display: 'flex',

        alignItems: 'flex-end'

    }
    
})
) 

const ModelsScreen = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [searchCopy, setSearchCopy] = useState();

    const {desde, rowsPerPage, desdeSearch, rowsPerPageSearch} = useSelector(state => state.ui);
    const {search: searchFlag} = useSelector(state => state.model);
    const [formValues, handleInputChange, reset] = useForm({
        search: '',
    });

    const {search} = formValues;

    useEffect(() => {
        dispatch(startLoadingModels(desde, rowsPerPage));
    }, [dispatch, desde, rowsPerPage]);


    useEffect(() => {
        if(searchFlag){
            dispatch(startSearchModels(searchCopy, desdeSearch, rowsPerPageSearch));
        }     
    }, [dispatch, desdeSearch, rowsPerPageSearch, searchFlag, searchCopy]);

    

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setSearchCopy(search);
        dispatch(startSearchModels(searchCopy, desdeSearch, rowsPerPageSearch ));
        
        
    }

    const handleClear = () => {
        dispatch(searchModelsOff());
        dispatch(changeDesde(0));
        dispatch(changeRowsPerPage(5));
        dispatch(changeDesdeSearch(0));
        dispatch(changeRowsPerPageSearch(5));  
        dispatch(startLoadingModels(desde, rowsPerPage));
        reset({search: ''})
    }





    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography 
                    component="h1" 
                    variant="h5"       
                >
                    Tabla de Modelos 3D:
                </Typography>
            </div>
            <div className={classes.barra} >
                <form onSubmit={handleSubmit} className={classes.input}>
                    <TextField
                    id="search-input"
                    name="search"
                    label="Search Models:"
                    placeholder="Press enter for search..."
                    className={classes.input}
                    onChange={handleInputChange}
                    value={search}
                    autoComplete="off"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    />
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: 'red' ,color: 'white'}}
                        type="button"  
                        onClick={handleClear}  
                    >
                        <ClearIcon />
                    </Button>
                </form>
                
                <div className={classes.button}>
                    <Link to="/model/add" style={{textDecoration: 'none'}}>
                        <Button 
                            variant="contained" 
                            style={{backgroundColor: 'green', color: 'white'}}
                            type="button"  
                            startIcon={<AddCircleIcon />}   
                            
                        >
                            New Models
                        </Button>
                    </Link>  
                </div> 
            </div>
            <ModalShowMore/>       
            <TableModels />
        </div>
    );
}

export default ModelsScreen;
