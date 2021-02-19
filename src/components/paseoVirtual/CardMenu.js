import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 350,
    marginBottom: '5px'
  },
  media: {
    height: 200,
  },
});

const CardMenu = ({title, screen, description}) => {
    const classes = useStyles();

    return (
    <Card className={classes.root}>
      <Link to={`/${screen}`} style={{textDecoration: 'none'}}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={`../../assets/menu/${screen}.jpg`}
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" style={{color: 'black'}}>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {description}
            </Typography>
            </CardContent>
        </CardActionArea>
      </Link> 
    </Card>
    );
}


CardMenu.propTypes = {
    title: PropTypes.string.isRequired,
    screen: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };
  

export default CardMenu;
