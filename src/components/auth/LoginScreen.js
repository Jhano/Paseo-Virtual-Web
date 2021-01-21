import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { startLogin } from '../../actions/auth';
import { useForm } from '../hooks/useForm';
import { removeError, setError } from '../../actions/ui';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/04/28/20/13/smartphone-2269340_960_720.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const LoginScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {msgError, validatedError, loading} = useSelector(state =>  state.ui);

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })

  const {email, password} = formValues;

  const handleLogin = (e) => {
      e.preventDefault();
      if(idFormValid()){
        dispatch(startLogin(email, password));
      }
      
  }

  const idFormValid = () => {

    if (!validator.isEmail(email)){
         dispatch(setError('Email is not valid'));
         return false;
     } else if(password.length < 5){
         dispatch(setError('Password should be at least 6 characters and match each other'));
         return false;
     }

     dispatch(removeError());
     return true
 }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form 
            className={classes.form} 
            onSubmit={handleLogin}
            noValidate
          >
            <TextField
              error={msgError?.includes('Email') ? validatedError : false}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoFocus
              onChange={handleInputChange}
              helperText={msgError?.includes('Email') && msgError}
             
            />
            <TextField
              error={msgError?.includes('Password') ? validatedError : false}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange}
              helperText={msgError?.includes('Password') && msgError}
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}