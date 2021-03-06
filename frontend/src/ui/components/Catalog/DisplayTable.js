import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalContainer from '../Modal/ModalContainer'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#8b96d2',
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
    minWidth: 600,
    maxHeight: 650
  },
});

function DisplayTable(rows) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{marginTop:'20px'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell >Temat pracy</StyledTableCell>
            <StyledTableCell >Typ pracy</StyledTableCell>
            <StyledTableCell >Autor</StyledTableCell>
            <StyledTableCell >Szczegóły</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.rows.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{index}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.type}</StyledTableCell>
              <StyledTableCell>{row.author}</StyledTableCell>
              <StyledTableCell><ModalContainer triggerText="Szczegóły" modalAction="thesisDetails" ButtonAsTrigger thesisId={row.id} table/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayTable 