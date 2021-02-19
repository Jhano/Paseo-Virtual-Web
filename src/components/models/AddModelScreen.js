import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { removeError, selectedFileModel, selectedFileModelFormat, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { startAddModel } from '../../actions/model';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        width: '100%'
      },
      topPag:{
        display: 'flex',
        justifyContent: 'space-between'
      },
      title: {
        fontSize: '30px',
        marginBottom: theme.spacing(1),

      },
      input:{
        width: '80%'
      },
      returnButton: {
        height: '50%'
      },    
      upload: {
        margin: theme.spacing(1, 0, 1),
        width: '20%',
        height: '40px'
      },
      inputImg: {
        display: 'none',
      },
  }));

const AddModelScreen = ({history}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const {loading, selectedFile, selectedFileFormat, validatedError, msgError} = useSelector(state => state.ui);
    const [formValues, handleInputChange, reset] = useForm({
        name: '',
        description: '',
        extraInfo: '',
        lat: '',
        lng: '',
        ejeZ: '',
        dateMonument: '',
    })

    const { name, description, extraInfo, lat, lng, ejeZ, dateMonument } = formValues;

    const handleFileModel = ({ target }) => {
        const file = target.files[0]
        if(file){
            dispatch(selectedFileModel(file));
        }else{
            dispatch(selectedFileModel(''));
        }
        
    };

    const handleFileFormat = ({ target }) => {
        const fileFormat = target.files[0]
        if(fileFormat){
            dispatch(selectedFileModelFormat(fileFormat));
        }else{
            dispatch(selectedFileModelFormat(''));
        }
        
    };

    const handleReturn = () => {
        history.push('/model');    
    }

    const handleSubmit = (e) => {
        e.preventDefault();        
        if(isFormValid()){
           
            dispatch(startAddModel({
                ...formValues,
                fileModel: selectedFile.name ? selectedFile.name : '',
                fileFormat: selectedFileFormat.name ? selectedFileFormat.name : ''
            }, selectedFile, selectedFileFormat));
            reset({
                name: '',
                description: '',
                extraInfo: '',
                lat: '',
                lng: '',
                ejeZ: '',
                dateMonument: '',
            });
            
            document.getElementById("contained-button-file").value= '';
            document.getElementById("contained-button-fileFormat").value= '';
            
        }
    }
    const isFormValid = () => {

        if(!validator.isEmpty(name)){
            if(name.length <= 2){ 
              dispatch(setError('Nombre no válido'));
              return false;
            }
        }
        if(!validator.isEmpty(description)){
            if(description.length <= 2){ 
              dispatch(setError('Descripción muy pequeña'));
              return false;
            }
        }
        if(!validator.isEmpty(extraInfo)){
            if(extraInfo.length <= 2){ 
              dispatch(setError('Información extra muy pequeña'));
              return false;
            }
        }
        if(!validator.isEmpty(dateMonument)){
            if(!validator.isDate(dateMonument)){ 
              dispatch(setError('Fecha del modelo no válida'));
              return false;
            }
        }
        if(!validator.isEmpty(lat)){
            if(!validator.isNumeric(lat)){ 
              dispatch(setError('Latitud no válida'));
              return false;
            }
        }
        if(!validator.isEmpty(lng)){
            if(!validator.isNumeric(lng)){ 
              dispatch(setError('Longitud no válida'));
              return false;
            }
        }
        if(!validator.isEmpty(ejeZ)){
            if(!validator.isNumeric(ejeZ)){ 
              dispatch(setError('Eje Z no válida'));
              return false;
            }
        }
        if( selectedFile !== ''){
            const fileName = selectedFile.name;
            const extension = fileName.split('.');

            const extensionValida = extension[1];
            if(extensionValida !== 'gltf'){
              dispatch(setError('Modelo, la extensión debe ser .gltf'));
              return false;
            }
        }
        if(selectedFile === ''){
            dispatch(setError('Modelo, Archivo .gltf es necesario'));
            return false;           
        }
        if( selectedFileFormat !== ''){
            const fileName = selectedFileFormat.name;
            const extension = fileName.split('.');

            const extensionValida = extension[1];
            if(extensionValida !== 'bin'){
              dispatch(setError('FileFormat, la extensión del archivo del modelo debe ser .bin'));
              return false;
            }
        }
        if(name === '' && selectedFile === ''){
            return false;
        }
    
    
         dispatch(removeError());
         return true
    }
        
    

    return (
        <div className={classes.root}>
            <div className={classes.topPag}>
                <Typography className={classes.title} variant="h6">Agregar Modelos:</Typography>
                <Button aria-label="return"
                        className={classes.returnButton} 
                        onClick={handleReturn}
                        type="button"
                        variant="contained"
                        color="primary"                          
                        >
                            <KeyboardReturnIcon/>
                </Button>
            </div>

            <Typography>
                    Para no tener problemas al agregar un modelo, es necesario llenar las casillas de:
                    <li>Nombre del modelo.</li>
                    <li>Archivo .gltf</li>
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container style={{display: 'flex', marginTop:'10px'}}>              
                    <Grid item xs={12} sm={12} md={5} lg={5} style={{display: 'flex', flexDirection: 'column', }}>
                            <Typography>
                                Nombre del modelo:
                            </Typography>
                            <TextField
                                error={msgError?.includes('Nombre') ? validatedError : false}
                                helperText={msgError?.includes('Nombre') && msgError}
                                margin="dense"
                                id="name"
                                required
                                name="name"
                                label="Nombre:"
                                placeholder="Subir nombre..."
                                type="text"
                                variant="outlined"
                                autoComplete="off"
                                value={name}
                                onChange={handleInputChange}
                            />
                            <Typography>
                                Subir Archivo .gltf:
                                </Typography>
                                <input
                                        id="contained-button-file"
                                        type="file"   
                                        className={classes.inputImg}     
                                        onChange={handleFileModel}
                                />
                                <label  style={{display:'flex'}} htmlFor="contained-button-file" > 
                                    
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        component="span"
                                        className={classes.upload}
                                        aria-label="Upload Image" 
                                        disabled={loading}
                                    >
                                        <CloudUploadIcon/>
                                    </Button>
                                    <TextField
                                        error={msgError?.includes('Modelo') ? validatedError : false}
                                        helperText={msgError?.includes('Modelo') && msgError}
                                        margin="dense"
                                        id="fileModel"
                                        type="text" 
                                        variant="outlined" 
                                        style={{width: '100%'}}
                                        required
                                        value={selectedFile ? selectedFile.name : ''}
                                        placeholder="Seleccione un modelo..."
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />    
                                </label> 
                            <Typography>
                                Localización del modelo:
                            </Typography>
                            <TextField
                                    error={msgError?.includes('Latitud') ? validatedError : false}
                                    helperText={msgError?.includes('Latitud') && msgError}
                                    margin="dense"                            
                                    id="lat"
                                    name="lat"
                                    label="Latitud:"
                                    type="number"  
                                    variant="outlined"
                                    placeholder="Agregar Latitud..."
                                    autoComplete="off"
                                    value={lat}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    error={msgError?.includes('Longitud') ? validatedError : false}
                                    helperText={msgError?.includes('Longitud') && msgError}
                                    margin="dense"
                                    id="lng"
                                    name="lng"                
                                    label="Longitud:"
                                    type="number"  
                                    variant="outlined"
                                    placeholder="Agregar Longitud..."
                                    autoComplete="off"
                                    value={lng}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    error={msgError?.includes('Eje') ? validatedError : false}
                                    helperText={msgError?.includes('Eje') && msgError}
                                    margin="dense"
                                    id="ejeZ"
                                    name="ejeZ"
                                    label="Eje Z:"                 
                                    type="number" 
                                    variant="outlined"
                                    autoComplete="off"
                                    placeholder="Agregar Eje Z..."
                                    value={ejeZ}
                                    onChange={handleInputChange}
                                />
                   
                    </Grid>
                    <Grid item md={2} lg={2} />
                    <Grid item xs={12} sm={12} md={5} lg={5} style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography>
                                Descripción del modelo:
                            </Typography>
                            <TextField
                                error={msgError?.includes('Descripcion') ? validatedError : false}
                                helperText={msgError?.includes('Descripcion') && msgError}
                                margin="dense"
                                id="description"
                                name="description"
                                label="Descripción:"
                                placeholder="Agregar Descripción..."
                                type="text"  
                                variant="outlined"
                                autoComplete="off"
                                value={description}
                                onChange={handleInputChange}
                            />
                            <Typography>
                                Información Extra del modelo:
                            </Typography>
                            <TextField
                                error={msgError?.includes('Informacion') ? validatedError : false}
                                helperText={msgError?.includes('Informacion') && msgError}
                                margin="dense"
                                id="extraInfo"
                                name="extraInfo"
                                label="Información Extra:"
                                placeholder="Agregar Información Extra..."
                                type="text"  
                                variant="outlined"
                                autoComplete="off"
                                value={extraInfo}
                                onChange={handleInputChange}
                            />
                            <Typography>
                                Fecha Historica del modelo:
                            </Typography>
                            <TextField
                                error={msgError?.includes('Fecha') ? validatedError : false}
                                helperText={msgError?.includes('Fecha') && msgError}
                                margin="dense"
                                id="dateMonument"
                                name="dateMonument"
                                type="date" 
                                variant="outlined"
                                placeholder="Agregar Fecha Historica..."
                                autoComplete="off"
                                value={dateMonument}
                                onChange={handleInputChange}
                            />  
                            <Typography>
                                Subir Archivo .bin:
                                </Typography>
                                <input
                                        id="contained-button-fileFormat"
                                        type="file"   
                                        className={classes.inputImg}     
                                        onChange={handleFileFormat}
                                />
                                <label  style={{display:'flex'}} htmlFor="contained-button-fileFormat" > 
                                    
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        component="span"
                                        className={classes.upload}
                                        aria-label="Upload Image" 
                                        disabled={loading}
                                    >
                                        <CloudUploadIcon/>
                                    </Button>
                                    <TextField
                                        error={msgError?.includes('FileFormat') ? validatedError : false}
                                        helperText={msgError?.includes('FileFormat') && msgError}
                                        margin="dense"
                                        id="fileFormat"
                                        type="text" 
                                        variant="outlined" 
                                        style={{width: '100%'}}
                                        required
                                        value={selectedFileFormat ? selectedFileFormat.name : ''}
                                        placeholder="Seleccione un modelo..."
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />    
                                </label>        
                    </Grid>
                    <Grid item md={2} lg={2} />
                    <Grid item xs={12} sm={12} md={6} lg={6} style={{display:'flex', flexDirection: 'column'}}>
                                
                                <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{marginTop: '20px'}}
                                        aria-label="Save"
                                        fullWidth
                                        startIcon={
                                            <SaveIcon/>
                                        }
                                        disabled={loading}
                                    >
                                    Guardar 
                                </Button>      
                    </Grid>
                </Grid>  
    </form>   
        </div>
    );
}

export default AddModelScreen;
