import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import MapIcon from '@material-ui/icons/Map';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../../actions/ui';

const useStyles = makeStyles((theme) => ({
    sizeMedium: {
      width: '40px',
      height: '40px',
    },
  }));

const SideListItems = ({mobile}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleCloseMobile = () => {
        mobile === "mobile" && dispatch(closeDrawer()); 
    }

    return (
        <div>
            <Link to="/user" style={{ textDecoration: 'none' }} >
                <ListItem button onClick={handleCloseMobile}>
                    <ListItemIcon>
                        <PersonIcon className={classes.sizeMedium} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography  style={{ color: 'black' }}>Perfil Usuario</Typography>} />
                </ListItem>
            </Link>
            <Link to="/model" style={{ textDecoration: 'none' }} >
                <ListItem button onClick={handleCloseMobile}>
                        <ListItemIcon>
                            <LocationCityIcon className={classes.sizeMedium}/>
                        </ListItemIcon>
                    <ListItemText primary={<Typography  style={{ color: 'black' }}>Modelos</Typography>} />
                </ListItem>
            </Link>
            <Link to="/map" style={{ textDecoration: 'none' }} >
                <ListItem button onClick={handleCloseMobile}>
                    <ListItemIcon>
                        <MapIcon className={classes.sizeMedium}/>
                    </ListItemIcon>
                    <ListItemText primary={<Typography  style={{ color: 'black' }}>Map</Typography>} />
                </ListItem>
            </Link>
        </div>
    );
}

export default SideListItems;
