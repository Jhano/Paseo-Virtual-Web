import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';


import SideListItems from './SideListItems';
import { closeDrawer } from '../../actions/ui';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  drawerPaper: {
    position: 'relative',
    height: '100vh',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerPaperCloseMobile: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

}));

const SideBar = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {openDrawer: open} = useSelector(state => state.ui);


  const handleDrawerClose = () => {
        dispatch(closeDrawer());
  };


  return (
        
      <div>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, 
                !open && classes.drawerPaperCloseMobile),
            }}
            open={open}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
        >
            
            <div className={classes.toolbarIcon}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Typography component="h1" variant="h6" color="primary" noWrap className={classes.title}>
                              Paseos Virtuales
                  </Typography>
                </Link>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <SideListItems mobile={'mobile'}/>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, 
                  !open && classes.drawerPaperClose),
            }}
            open={open}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
        >
            <div className={classes.toolbarIcon}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography component="h1" variant="h6" color="primary" noWrap className={classes.title}>
                            Paseos Virtuales
                </Typography>
            </Link>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <SideListItems/>
        </Drawer>
      </Hidden>
      
    </div>
    )
}

export default SideBar;
