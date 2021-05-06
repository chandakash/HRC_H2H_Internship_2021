import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
  container: {
    maxWidth: '80%',
    maxHeight: 400,
    marginLeft:'100px'
  },
  img:{
    widht:'10px',
    height:'10px'
  },
  head:{
    alignItems:'left',
    fontWeight:'bolder'
  },
  root: {
    "& .MuiTableCell-root": {
      padding: '4px',
      fontSize:'0.65rem'
    },
    "& .MuiTableCell-alignRight":{
      textAlign: 'left'
  }
  }
}));

export default function InceptionTable({responseData,scrollabeTarget}) {

  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.container} id="scrollableDiv">
    <Table stickyHeader aria-label="sticky table" className={classes.root}>
        <TableHead className={classes.head}>
          <TableRow size="size">
            <TableCell>ID</TableCell>
            <TableCell align="right" className={classes.cell_id}>AUTHOR</TableCell>
            <TableCell align="right">WIDTH</TableCell>
            <TableCell align="right">HEIGHT</TableCell>
            <TableCell align="right">URL</TableCell>
            <TableCell align="right">DOWNLOAD_URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((row,index) => (
            <TableRow key={index}>
              <TableCell className={classes.cell_id}>{row.id}</TableCell>
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right">{row.width}</TableCell>
              <TableCell align="right">{row.height}</TableCell>
              <TableCell align="right"><img src={row.download_url} alt="img" className={classes.img}/></TableCell>
              <TableCell align="right"><a href={row.url} target="_blank">{row.url}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ height: "50%", paddingLeft: "50%", overflow: "hidden" }}>
            <CircularProgress />
          </div> 
    </TableContainer>

  );
}