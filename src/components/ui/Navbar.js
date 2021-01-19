import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';


import { openDrawer } from '../../actions/ui';
import { startLogout } from '../../actions/auth';
import { Link } from 'react-router-dom';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,

    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: '0px',
    },
    sizeButton: {
      width: '40px',
      height: '40px',
    },
    title: {
      flexGrow: 1,
    }, 
    menuButtonHidden: {
      display: 'none',
    },
    sizeMedium: {
      width: '40px',
      height: '40px',
      marginRight: '20px'
    },
  }));

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {openDrawer: open} = useSelector(state => state.ui);
    const {img} = useSelector(state => state.user);

    const handleDrawerOpen = () => {
        dispatch(openDrawer());
    };

    
  const handleLogout = () => {
    dispatch(startLogout());
  }

    return (
        
            <AppBar 
              position="absolute" 
              className={clsx(classes.appBar, open && classes.appBarShift)}
            >
            <Toolbar className={classes.toolbar}>
                    <div>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, 
                                open && classes.menuButtonHidden)
                            }
                        >
                            <MenuIcon className={classes.sizeButton}/>
                        </IconButton>
                    </div>
                    <div  style={{display: 'flex'}}>
                      <Link to="/user" style={{ textDecoration: 'none' }}>
                        {
                          img 
                              ? <Avatar alt="imagen usuario" src={`../../uploads/usuario/${img}`} className={classes.sizeMedium}/>
                              : 
                                  <IconButton color="inherit">
                                    <AccountCircleIcon className={classes.sizeMedium}/> 
                                  </IconButton>
                                  
                        }
                      </Link>  
                        <ListItem button onClick={handleLogout} >
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </div>
                
                </Toolbar>
            </AppBar>
        
        
    );
}

export default Navbar;
