import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import MoreIcon from '@material-ui/icons/More';
import { Button, TableHead } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, changeRowsPerPage, changeDesde, changeDesdeSearch, changeRowsPerPageSearch, openModal } from '../../actions/ui';
import TablePaginationAction from '../ui/TablePaginationAction';
import { startDeleteModel } from '../../actions/model';
import { Link } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const TableModels = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {page, rowsPerPage, rowsPerPageSearch } = useSelector(state => state.ui);
    const {models, cuantos, search } = useSelector(state => state.model);

    const handleChangePage = (newPage, desde) => {
        dispatch(changePage(newPage));
        if(search){
          dispatch(changeDesdeSearch(desde));
        }else{
          dispatch(changeDesde(desde));
        }    
    };
    
    const handleChangeRowsPerPage = (event) => {
        dispatch(changePage(0));
        if(search){
          dispatch(changeRowsPerPageSearch(parseInt(event.target.value, 10)));
          dispatch(changeDesdeSearch(0));  
        }else{
          dispatch(changeRowsPerPage(parseInt(event.target.value, 10)));
          dispatch(changeDesde(0));
        }  
    };
    
    const handelDeleteModel = (id) => {
        dispatch(startDeleteModel(id))
    }

    const handleModal = () => {
      dispatch(openModal())
    }
 

     return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Model3D</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model) => (
            <StyledTableRow key={model.id}>
              <StyledTableCell component="th" align="center" scope="row">
                {model.data.name}
              </StyledTableCell>
              <StyledTableCell align="center">{model.model.obj}</StyledTableCell>
              <StyledTableCell align="center">{model.data.description}</StyledTableCell>
              <StyledTableCell align="center">{JSON.stringify(model.location, null, 3)}</StyledTableCell>
              <StyledTableCell align="center">
                    <Button
                        variant="contained" 
                        style={{backgroundColor: 'red', color: 'white', marginRight:'5px'}}
                        type="button"  
                        onClick={() => handelDeleteModel(model.id)}
                    >
                        <DeleteIcon />
                    </Button>

                    <Link to={`/model/update/${model.id}`} style={{textDecoration: 'none'}}>
                      <Button
                          variant="contained" 
                          style={{backgroundColor: 'blue', color: 'white', marginRight:'5px' }}
                      
                          type="button"  
                      >
                          <UpdateIcon />
                      </Button>
                    </Link>  
                             
                    <Button
                        variant="contained" 
                        color="default"
                        type="button"  
                        onClick={handleModal}  
                    >
                        <MoreIcon />
                    </Button>
                       
                     
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: cuantos }]}          
              count={cuantos}
              rowsPerPage={search ? rowsPerPageSearch : rowsPerPage}
              page={page}
              labelRowsPerPage="Filas por Página:"
              SelectProps={{
                inputProps: { 'aria-label':  'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationAction}
            />
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default TableModels;
