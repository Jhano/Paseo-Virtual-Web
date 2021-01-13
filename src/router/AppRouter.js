
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    BrowserRouter as Router ,
    Switch, 
    Redirect
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import { LoginScreen } from '../components/auth/LoginScreen';
import DashboardRoute from './DashboardRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import CircularProgress from '@material-ui/core/CircularProgress';
import { startChecking } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: ' column',
      justifyContent: 'center',
      alignItems: 'center'

    }
  }));



const AppRouter = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);




    //comprueba si ya se encuentra un usuario autentificado
    useEffect(() => {
        
        dispatch( startChecking());
        
    }, [dispatch]);


    if ( checking ) {
        return (
            <Grid container className={classes.root} >
                <h2>Wait...</h2>
                <CircularProgress />     
            </Grid>
        );
    }


        return (
       
            <Router>
                <div>
                <Switch>
    
                     <PublicRoute
                            exact
                            path="/login" 
                            component={ LoginScreen }
                            isAuthenticated={ !!uid }
                    />
    
                    <PrivateRoute
                            path="/" 
                            component={ DashboardRoute } 
                            isAuthenticated={ !!uid }
                    />
    
                    <Redirect to="/login"/>
                </Switch>
                </div>
            </Router>
            
        );
    

    
}

export default AppRouter;
