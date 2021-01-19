import React from 'react';
import  Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EmailIcon from '@material-ui/icons/Email';
import { InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import Typography from '@material-ui/core/Typography';
import { startUpdateUser } from '../../actions/user';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
        marginTop: theme.spacing(3),
    },
    label: {
      width: '100%',
      display: 'flex', 
      justifyContent: 'start',
      padding: '5px'
    },
    input: {
      width: '80%',
      padding: '10px',
      marginBottom: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      marginLeft: '20%',
      width: '40%'
    },
    title:{
      display: 'flex',
      justifyContent: 'center',
      width: '60%',
      padding: '10px',
      backgroundColor: '#E91E63',
      color: 'white',
      marginBottom: theme.spacing(2),
      marginLeft: '10%'

    }

  }));

const UserEditPerfil = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {msgError, validatedError, loading} = useSelector(state =>  state.ui);

    const [formValues, handleInputChange, reset] = useForm({
      name: '',
      email: '',
      password: '',
      password2: ''
    })

    const {name, email, password, password2} = formValues;

    const handleUpdate = (e) => {
      e.preventDefault();
      if(isFormValid()){
        dispatch(startUpdateUser({
          name,
          email,
          password,
        }));
        reset({
          name: '',
          email: '',
          password: '',
          password2: ''
        })
      }
      
  }


    const isFormValid = () => {

      

      if (!validator.isEmpty(email)){
           if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'));
            return false;
           }   
      } 
      if(!validator.isEmpty(name)){
          if(name.length <= 2){ 
            dispatch(setError('Name is not valid'));
            return false;
          }
      }
      if(!validator.isEmpty(password)){
        if(password.length <= 5){
          dispatch(setError('Password should be at least 6 characters and match each other'));
          return false;
        }
      }
      if(!validator.equals(password, password2)){
          dispatch(setError('Passwords should be the same'));
          return false;
        }
      if(name === '' && email === '' && password === '' && password2 === ''){
          return false;
      }
  
       dispatch(removeError());
       return true
   }

    return (
        <div className={classes.root}>
          
              <div className={classes.title}>
              <Typography component="h1" variant="h5">
                Editar Perfil
              </Typography>
              </div>

             <TextField
                  error={msgError?.includes('Name') ? validatedError : false}
                  id="nombre-input"
                  name="name"
                  label="Name"
                  placeholder="Enter name..."
                  className={classes.input}
                  value={name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  helperText={msgError?.includes('Name') && msgError}
                />
                <TextField
                  error={msgError?.includes('Email') ? validatedError : false}
                  id="email-input"
                  name="email"
                  label="Email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={handleInputChange}
                  className={classes.input}
                  autoComplete="off"
                  helperText={msgError?.includes('Email') && msgError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                 <TextField
                 error={msgError?.includes('Password') ? validatedError : false}
                  id="password-input"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder={`Enter password...`}
                  value={password}
                  onChange={handleInputChange}
                  className={classes.input}
                  autoComplete="off"
                  helperText={msgError?.includes('Password') && msgError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                          <VisibilityIcon />
                      </InputAdornment>
                    ),
                  }}
                  
                />
                 <TextField
                  error={msgError?.includes('Passwords') ? validatedError : false}
                  id="password2-input"
                  name="password2"
                  label="Repeat Password"
                  type="password"
                  placeholder={`Enter password...`}
                  value={password2}
                  onChange={handleInputChange}
                  className={classes.input}
                  autoComplete="off"
                  helperText={msgError?.includes('Passwords') && msgError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                          <VisibilityIcon />
                      </InputAdornment>
                    ),
                  }}      
                />
                
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleUpdate}
                        disabled={loading}
                        >
                        Guardar Perfil
                    </Button>
                
                    
        </div>
    );
}

export default UserEditPerfil;
