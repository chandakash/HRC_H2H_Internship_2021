import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox, CircularProgress } from '@material-ui/core';
import '../index'
import { useState, useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: 370,
  },
  head: {
    alignItems: 'left',
    background: '#273D49',
  },
  cellroot:{
    height: '5px',
    color: 'pink'
  },
  checkboxcell:{
    padding:'2px 10px'
  },
  checkboxhead:{
    padding:'3px 10px'
  },
  root: {
    "& .MuiTableCell-root": {
      padding: '1px',
      fontSize: '0.60rem',
      borderBottom: 'none'
    },
    "& .MuiTableCell-alignRight": {
      textAlign: 'left'
    },
    "& .PrivateSwitchBase-root-18": {
      padding: '1px 1px'
    },
    "& .MuiTableCell-stickyHeader": {
      background: "#283A46",
      fontWeight: 'bolder',
      color: "#97A1A9",
      fontSize: '0.5rem',
      borderBottom: '1px solid #283A46',
    },
    "& .MuiTableCell-body": {
      color: 'white',
      maxHeight:'5px'
    },
    root:{
      '& .MuiFormLabel-root':{
        fontSize:'0.25rem',
        color:'white'
      }
    },
    sizeSmall:{
      height: '3px'
    }
  }
}));

export default function PanelTable({ responseData }) {

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setList(responseData);
    // console.log(isCheck);
  }, [list,isCheck]);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map(row => row.invoiceId));
    
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  return (
    <TableContainer className={classes.container} id="scrollableDiv">
      <Table stickyHeader aria-label="sticky table" className={classes.root}>
        <TableHead >
          <TableRow >
            <TableCell>
              <Checkbox size="small" color="secondary" className={classes.checkboxhead}
                type="checkbox"
                id="selectAll"
                onChange={handleSelectAll}
                checked={isCheckAll}
              />
            </TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell align="right" className={classes.cell_id}>Customer#</TableCell>
            <TableCell align="right">Invoice#</TableCell>
            <TableCell align="right">Invoice Amount</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Predicted Payment Date</TableCell>
            <TableCell align="right">Predicted Aging Bucket</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((row, index) => (
            <TableRow key={index} style={index % 2 ? { background: "#283A46" } : { background: "#273D49CC" }}>
              <TableCell>
                <Checkbox size="small" color="secondary" className={classes.checkboxcell}
                    type="checkbox"
                    id={row.invoiceId}
                    onChange={handleClick}
                    Checked={isCheck.includes(row.invoiceId)}
                 />
              </TableCell>
              <TableCell align="right">{row.custNumber}</TableCell>
              <TableCell align="right">{row.nameCustomer}</TableCell>
              <TableCell align="right">{row.invoiceId}</TableCell>
              <TableCell align="right">{row.totalOpenAmount}</TableCell>
              <TableCell align="right">{row.dueInDate}</TableCell>
              <TableCell align="right"><h5>-</h5></TableCell>
              <TableCell align="right"><h5>-</h5></TableCell>
              <TableCell align="right"><h5>Lorem ipsum .....</h5></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ height: "50%", paddingLeft: "50%", overflow: "hidden", paddingTop: '10px' }}>
        <CircularProgress disableShrink color="secondary" className={classes.circularprogess} />
        <h6 style={{ color: '#C0C6CA' }}>Loading</h6>
      </div>
    </TableContainer>

  );
}