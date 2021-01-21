import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationAction(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {desde, desdeSearch} = useSelector(state => state.ui);
  const {search} = useSelector(state => state.model);

  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = () => {
      onChangePage(0, 0);
  };

  const handleBackButtonClick = () => {
      if(search){
        if(desdeSearch < 5){
          onChangePage(page - 1,  0);
        }else{
          onChangePage(page - 1,  desdeSearch - rowsPerPage);
        }
        
      }else{
        if(desde < 5){
          onChangePage(page - 1,  0);
        }else{
          onChangePage(page - 1,  desde - rowsPerPage);
        }
        
      }
    
    
      
  };

  const handleNextButtonClick = () => {
    if(search){
      onChangePage(page + 1,  desdeSearch + rowsPerPage);
    }else{
      onChangePage(page + 1,  desde + rowsPerPage);
    }
    
  };

  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1), count - rowsPerPage);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationAction.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationAction;