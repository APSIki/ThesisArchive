import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
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
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Temat pracy</StyledTableCell>
            <StyledTableCell align="right">Typ pracy</StyledTableCell>
            <StyledTableCell align="right">Autor</StyledTableCell>
            <StyledTableCell align="right">Opiekun</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(rows)}
          {rows.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.thesisSubject}</StyledTableCell>
              <StyledTableCell align="right">{row.thesisType}</StyledTableCell>
              <StyledTableCell align="right">{row.thesisAuthor}</StyledTableCell>
              <StyledTableCell align="right">{row.thesisGuardian}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayTable 