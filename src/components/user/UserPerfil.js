import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import  Avatar from '@material-ui/core/Avatar';
import  Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import  Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import {  startUploadFileUser } from '../../actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
        marginTop: theme.spacing(3),
    },
    circleAccount: {
        width: '100%',
        height: '100%'
    },
    label: {
      width: '100%',
      display: 'flex', 
      justifyContent: 'start',
      padding: '5px'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(1, 0, 2),
      width: '100%',
      height: '30px'
    },
    inputImg: {
      display: 'none',
    },
  }));

const UserPerfil = () => {
    const classes = useStyles();
    const {name, email, img} = useSelector(state => state.user);
    const {loading} = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const handleImage = () => {
      const file = document.querySelector("input[type=file]").files[0];
      dispatch(startUploadFileUser(file));
    }

    return (
        <div className={classes.root}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                        {
                          img 
                              ? <Avatar alt="imagen usuario" src={`../../uploads/usuario/${img}`} className={classes.avatar}/>
                              : 
                                  <Avatar alt="imagen usuario"  className={classes.avatar}>
                                    <AccountCircleIcon color="inherit" className={classes.circleAccount}/> 
                                  </Avatar>
                                  
                        }
                        <input
                          accept="image/*"
                          className={classes.inputImg}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleImage}
                        />

                        <label style={{width: '100%'}}htmlFor="contained-button-file">
                          <Button
                          type="button"
                          variant="contained"
                          color="secondary"
                          component="span"
                          className={classes.submit}
                          aria-label="Upload Image"
                          startIcon={<CloudUploadIcon/> }
                          disabled={loading}
                          >
                              Upload
                          </Button>
                        </label>
                        
          </div>
                        
                    <Typography component="h1" className={classes.label} variant="h5">
                        {name}
                    </Typography>
                    <Typography component="h1" className={classes.label} variant="h5">
                        {email}
                    </Typography>
        </div>
    );
}

export default UserPerfil;
