import React, { useEffect } from 'react';
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

import { removeError, selectedFileModel, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { startFindModel, startUpdateModel } from '../../actions/model';
import { useParams } from 'react-router-dom';


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

const UpdateModelScreen = ({history}) => {

    const {modelId} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect( () => {
            dispatch(startFindModel(modelId)); 
    }, [dispatch, modelId]);


    const {loading, selectedFile, validatedError, msgError} = useSelector(state => state.ui);
    const {modelFind} = useSelector(state => state.model);

    const [formValues, handleInputChange, reset] = useForm({
        name: '',
        texture: '',
        shadow: '',
        description: '',
        extraInfo: '',
        lat: '',
        lng: '',
        ejeZ: '',
        dateMonument: '',
    })



    const { name, texture, shadow, description, extraInfo, lat, lng, ejeZ, dateMonument } = formValues;

    const handleCapture = ({ target }) => {
        const file = target.files[0]
        if(file){
            dispatch(selectedFileModel(file));
        }else{
            dispatch(selectedFileModel(''));
        }
        
    };

    const handleReturn = () => {     
        history.push('/model');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(startUpdateModel(modelId,{
                name,
                texture,
                shadow,
                description,
                extraInfo,
                lat,
                lng,
                ejeZ,
                dateMonument,
                fileModel: selectedFile.name ? selectedFile.name : '',
            }, selectedFile));
            reset({
                name: '',
                texture: '',
                shadow: '',
                description: '',
                extraInfo: '',
                lat: '',
                lng: '',
                ejeZ: '',
                dateMonument: '',
            });
            document.getElementById("contained-button-file").value= '';
        }
    }
    const isFormValid = () => {

        const copyData = {
            name,
            texture,
            shadow,
            description,
            extraInfo,
            lat,
            lng,
            ejeZ,
            dateMonument,
        }

     

        for (const object in copyData) {
            if (validator.isEmpty(copyData[object])) {
                delete copyData[object];
            }
        }

        if(Object.keys(copyData).length === 0 && selectedFile === ''){
            return false
        }
        
        if(!validator.isEmpty(name)){
            if(name.length <= 2){ 
              dispatch(setError('Nombre no válido'));
              return false;
            }
        }
        if(!validator.isEmpty(texture)){
            if(texture.length <= 2){ 
              dispatch(setError('Textura no válida'));
              return false;
            }
        }
        if(!validator.isEmpty(shadow)){
            if(shadow.length <= 2){ 
              dispatch(setError('Sombra no válida'));
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
            if(!validator.isDate(dateMonument, ['-'])){ 
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
            if(extensionValida !== 'obj' && extensionValida !== 'sfb'){
              dispatch(setError('Modelo, la extensión debe ser .obj o .sfb'));
              return false;
            }
        }

    
    
         dispatch(removeError());
         return true
    }
        
    

    return (
        <div className={classes.root}>
            <div className={classes.topPag}>
                <Typography className={classes.title} variant="h6">Actualizar Modelo:</Typography>
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

            <form onSubmit={handleSubmit}>
                <Grid container style={{display: 'flex', marginTop:'10px'}}>              
                    <Grid item xs={12} sm={12} md={5} lg={5} style={{display: 'flex', flexDirection: 'column', }}>
                            <Typography>
                                Nombre del modelo*:
                            </Typography>
                            <TextField
                                error={msgError?.includes('Nombre') ? validatedError : false}
                                helperText={msgError?.includes('Nombre') && msgError}
                                margin="dense"
                                id="name"
                                name="name"             
                                placeholder={modelFind ? `${modelFind.name ? modelFind.name : 'Subir nombre'}...` : 'Subir nombre...'}
                                type="text"
                                variant="outlined"
                                autoComplete="off"
                                value={name}
                                onChange={handleInputChange}
                            />
                            <Typography>
                                Texturas del modelo*:
                            </Typography>
                            <TextField
                                error={msgError?.includes('Textura') ? validatedError : false}
                                helperText={msgError?.includes('Textura') && msgError}
                                margin="dense"
                                id="texture"
                                name="texture"
                                type="text" 
                                variant="outlined" 
                                placeholder={modelFind ? `${modelFind.texture ? modelFind.texture : 'Subir texturas'}...` : 'Subir texturas...'}
                                autoComplete="off"
                                value={texture}
                                onChange={handleInputChange}
                            /> 
                            <Typography>
                                Sombras del modelo*:
                            </Typography>
                            <TextField
                                error={msgError?.includes('Sombra') ? validatedError : false}
                                helperText={msgError?.includes('Sombra') && msgError}
                                margin="dense"
                                id="shadow"
                                name="shadow"
                                type="text"
                                placeholder={modelFind ? `${modelFind.shadow}...` : 'Subir sombras...'}
                                variant="outlined"
                                autoComplete="off"
                                value={shadow}
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
                                placeholder={modelFind ? `${modelFind.description ? modelFind.description : 'Subir descripcion'}...` : 'Subir descripcion...'}
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
                                placeholder={modelFind ? `${modelFind.extraInfo ? modelFind.extraInfo : 'Subir información Extra'}...` : 'Subir información Extra...'}
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
                                autoComplete="off"
                                value={dateMonument}
                                onChange={handleInputChange}
                            />         
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} style={{display: 'flex', flexDirection:'column'}}>
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
                                    placeholder={modelFind ? `${modelFind.lat ? modelFind.lat : 'Subir latitud'}...` : 'Subir latitud...'}
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
                                    placeholder={modelFind ? `${modelFind.lng ? modelFind.lng : 'Subir longitud'}...` : 'Subir longitud...'}
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
                                    placeholder={modelFind ? `${modelFind.ejeZ ? modelFind.ejeZ  : 'Subir eje z'}...` : 'Subir eje z...'}
                                    value={ejeZ}
                                    onChange={handleInputChange}
                                />

                    </Grid>
                    <Grid item md={2} lg={2} />
                    <Grid item xs={12} sm={12} md={5} lg={5} style={{display:'flex', flexDirection: 'column'}}>
                                <Typography>
                                Subir modelo 3D*:
                                </Typography>
                                <input
                                        id="contained-button-file"
                                        type="file"   
                                        className={classes.inputImg}     
                                        onChange={handleCapture}
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
                                        value={selectedFile ? selectedFile.name : ''}
                                        placeholder={modelFind ? `${modelFind.fileModel ? modelFind.fileModel  : 'Subir Archivo del modelo'}...` : 'Subir Archivo del modelo...'}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />    
                                </label> 
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

export default UpdateModelScreen;
