import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextureIcon from '@material-ui/icons/Texture';
import DescriptionIcon from '@material-ui/icons/Description';
import TodayIcon from '@material-ui/icons/Today';
import InfoIcon from '@material-ui/icons/Info';
import LocationCityIcon from '@material-ui/icons/LocationCity';


import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { clearModelFind } from '../../actions/model';

const useStyles = makeStyles((theme) => ({
    modal: {
      width: '800px',
      height: '900px'

    },
    root: {
        padding: theme.spacing(2),
        width: '100%',
        background: '#000000',
        color: '#f5f5f5 '
      },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
      inputfileBox: {
        position: 'relative'
      },
      fileBox: {
        display: 'inline-block',
        width: '100%',
        border: '1px solid',
        padding: '5px 0px 5px 5px',
        boxSizing: 'border-box',
      } ,     
      submit: {
        margin: theme.spacing(1, 0, 1),
        width: '100%',
      },
      inputImg: {
        display: 'none',
      },
  }));


const ModalShowMore = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {activeModal } = useSelector(state => state.ui);
    const {modelFind: model} = useSelector(state  => state.model) ;



    const handleClose = () => {
        dispatch(closeModal());
        dispatch(clearModelFind());
      }

    return (
        
            
                <Dialog 
                    open={activeModal} 
                    onClose={handleClose} 
                    aria-labelledby="form-dialog-title"
                    aria-modal="true"
                    maxWidth="lg"
                >
                  {
                    <div className={classes.modal}>
                      <MuiDialogTitle disableTypography className={classes.root}>
                          <Typography 
                            variant="h6"
                            component="span"
                          >
                            Modelo: {model ? `${model.data.name ? model.data.name : '"Nombre"'}` : '"Nombre"'}
                          </Typography>
                          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                              <CloseIcon />
                          </IconButton> 
                          <hr/>  
                      </MuiDialogTitle> 
                      <DialogContent>
                
                        <div style={{display: 'flex'}}>  
                          <LocationCityIcon/>
                          <Typography 
                            variant="h6"
                            component="span"
                          >
                            Archivo .gtlf: {model ?`${model.model.obj ? model.model.obj : '"Archivo .gltf"'}` : '"Archivo .gltf"'}
                          </Typography>
                        </div>
                        <div style={{display: 'flex'}}>  
                          <TextureIcon/>
                          <Typography 
                            variant="h6"
                            component="span"
                          >
                            Archivo .bin: {model ? `${model.model.fileFormat ? model.model.fileFormat : '"Archivo .bin"'}` : '"Archivo .bin"'}
                          </Typography>
                        </div>
                        <div style={{display: 'flex'}}>  
                          <DescriptionIcon/>
                          <Typography 
                            variant="h6"
                            component="span"
                          >
                            Descripción Historica: {model ? `${model.data.description  ? model.data.description : '"La Descripción"'}`  : '"La Descripción"'}
                          </Typography>
                        </div>
                        <div style={{display: 'flex'}}>  
                          <TodayIcon/>
                          <Typography 
                            variant="h6"
                            component="span"
                          >
                            Fecha Historica: {model ? `${model.data.dateMonument ? model.data.dateMonument.split('T')[0] : '"Fecha historica del modelo"'}` : '"Fecha historica del modelo"'}
                          </Typography>
                        </div>
                        <div style={{display: 'flex'}}>  
                          <InfoIcon/>
                          <Typography 
                            variant="h6"
                            component="span"
                          >
                            Información Extra: {model ? `${model.data.extraInfo ? model.data.extraInfo : '"Información extra relevante del modelo"'}` : '"Información extra relevante del modelo"'}
                          </Typography>
                        </div>
                        <div style={{display: 'flex'}}>
                          <LocationOnIcon/>
                          <Typography 
                            variant="h6"
                            component="span"
                          > 
                            Location: {model ? `${model.location ? JSON.stringify(model.location, null, 3) : '"Localización"'}` : '"Localización"'}
                          </Typography>
                        </div>
                       
                  
                      
                      </DialogContent>
                      <DialogActions>
                      </DialogActions>
                    </div>
                  } 
                </Dialog>
                            
    );
}

export default ModalShowMore;
