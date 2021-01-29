import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%'
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

    const handleClose = () => [
        dispatch(closeModal())
    ]

    return (
        
            
                <Dialog 
                    open={activeModal} 
                    onClose={handleClose} 
                    aria-labelledby="form-dialog-title"
                    aria-modal="true"
                    maxWidth="lg"
                >
                    <MuiDialogTitle disableTypography className={classes.root}>
                        <Typography variant="h6">Modelo: name</Typography>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton> 
                        <hr/>  
                    </MuiDialogTitle> 
                    <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                    </DialogActions>
                </Dialog>
                            
    );
}

export default ModalShowMore;
