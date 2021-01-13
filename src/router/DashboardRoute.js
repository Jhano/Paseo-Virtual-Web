
import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 3,
        height: '100vh',
        marginTop: theme.spacing(5),
        overflow: 'auto',
      },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));

const DashboardRoute = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <CssBaseline />
                <Navbar/>
                <SideBar/>
                <main className={classes.content}>  
                    <div>
                        <Container maxWidth="lg" className={classes.container}>
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
                    </div>
                </main>
        </div>
    );
}

export default DashboardRoute;
