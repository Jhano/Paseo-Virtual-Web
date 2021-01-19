
import React, { useEffect } from 'react';
import { 
    Switch, 
    Route,  
    Redirect
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';



import MapScreen from '../components/map/MapScreen';
import ModelsScreen from '../components/models/ModelsScreen';
import VirtualScreen from '../components/paseoVirtual/VirtualScreen';
import Navbar from '../components/ui/Navbar';
import SideBar from '../components/ui/SideBar';
import UserScreen from '../components/user/UserScreen';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { startGetUser } from '../actions/user';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));

const DashboardRoute = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {uid} = useSelector(state => state.auth);
    const {img} = useSelector(state => state.user);

    

    useEffect(() => {
        dispatch(startGetUser(uid));
    }, [dispatch, uid, img]);

    return (
        <div className={classes.root}>
                <CssBaseline />
                <Navbar/>
                <SideBar/>
                <main className={classes.content}>  
                    <div  className={classes.appBarSpacer}/>
                        <Container maxWidth="xl" className={classes.container}>
                            <Grid container spacing={3}>
                                <Switch>
                                    <Route exact path='/' component={VirtualScreen}/>
                                    <Route exact path='/user' component={UserScreen}/>
                                    <Route exact path='/model' component={ModelsScreen}/>
                                    <Route exact path='/map' component={MapScreen}/>

                                    <Redirect to="/"/>
                                </Switch>
                            </Grid> 
                        </Container>
                </main>
        </div>
    );
}

export default DashboardRoute;
