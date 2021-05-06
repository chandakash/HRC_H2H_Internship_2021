import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

import axios from "axios"
import { createData } from "../utils";

import InfiniteScroll from "react-infinite-scroll-component";
import { headCells } from './headCells';
import { CircularProgress } from '@material-ui/core';
import "../styles.css"

import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

// import AddDialogForm from "./AddDialogForm";
// import EditDialogForm from './EditDialogForm';
import DeleteDialogForm from "./DeleteDialogForm";
import AddFormDialog from './AddFormDialog';

const URL = "http://localhost:8081/1805096";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem auto",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "0",
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 600,
  },
  Grid: {
    display: "flex",
    flexDirection: "column",
  },
  checkboxcell:{
    padding:'2px 10px',
    transform: "scale(0.7)",
    color:theme.palette.primary.main,
  },
  checkboxhead:{
    padding:'3px 10px',
    transform: "scale(0.7)",
    color:theme.palette.primary.main
  },
  tablecontainer: {
    maxHeight: 370,
    marginBottom:'10px'
  },
  infiniteScrollGrid:{
    paddingLeft: '30px',
      paddingRight:'30px',
  },
  main: {
    // paddingTop: '20px',
    paddingLeft: '30px',
    paddingRight: '30px'
},
paper: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#273D49CC',
},
root: {
  "& .MuiTableCell-root": {
    padding: '1px',
    fontSize: '0.60rem',
    borderBottom: 'none'
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
  },
},
  /* Panel Header*/
  predict: {
    marginRight: theme.spacing(1),
  },
  add: {
      marginLeft: theme.spacing(1),
      border: `1px solid ${theme.palette.secondary.main}`,
      color:theme.palette.primary.main,
      background:'#273D49CC'
  },
  edit: {
      marginLeft: theme.spacing(1)
  },
  delete: {
      marginLeft: theme.spacing(1)
  },
  header: {
      padding: '30px 30px'
  },
  input: {
      color: 'white',
      fontSize: '0.6rem',
      marginLeft: theme.spacing(1),
      flex: 1,
  },

  labelroot: {
      fontSize: '0.5rem',
      color: theme.palette.primary
  },
  searchpaper: {
      backgroundColor: theme.palette.primary.dark,
      height: '30px',
      marginLeft: theme.spacing(1),
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 200,
      border: `1px solid ${theme.palette.secondary.main}`
  },
  primary:{
      color: "white",
  },
  oultined:{
    color:"blue"
  }
}));

// const GridPanel = () => {
export default function InvoicePanelTable(){
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [add, setAdd] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const [searchRow, setSearchRow] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [pageCount, setCount] = React.useState(1);
  const [responseData, setResponseData] = React.useState([]);
  const [isNext, isNextFunc] = React.useState(false);
 

  const handleLoad = React.useCallback(() => {
    try{
          const fetchData = async()=>{
            const response = await axios.get(`http://localhost:8081/1805096/UpdatePage?PageNo=${pageCount}`)

            setResponseData([...responseData,...response.data]);
            isNextFunc(true);

          }
          fetchData();
        }catch(error){
          console.log(error);
        }
  }, [pageCount]);

  function fetchMoreData() {
    setCount(pageCount + 1); 
  }

  React.useEffect(() => {
    handleLoad();
  }, [handleLoad,pageCount]);

  const handleAdd = () => {
    setAdd(!add);
    handleLoad();
  };

  const handleRemove = () => {
    setRemove(!remove);
    handleLoad();
  }

  const handleEdit = () => {
    setEdit(!edit);
    handleLoad();
    // setSelected([]);
  };

  const debounce = (func) =>{
    let timer;
    return function(...args){
      const context = this;
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args);
      }, 500);
    }
  }
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // if (search.match(/^[0-9]*$/g) && search.length > 3) {
      console.log(e.target.value);
      try{
        const fetchData = async()=>{
          const response = await axios.get(`http://localhost:8081/1805096/FetchData?DocId=${e.target.value}`)

          setResponseData([...response.data]);
          console.log([...response.data]);

        }
        fetchData();
      }catch(error){
        console.log(error);
      }
    // }
  };

  const optimisedSearch = React.useCallback(debounce(handleSearch),[]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(responseData.map(row => row.invoiceId));
      return;
    }
    setSelected([]);

  };
  
  const handleClick = (event, invoiceId) => {
    const selectedIndex = selected.indexOf(invoiceId);
    console.log(selectedIndex)
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, invoiceId);
      console.log(invoiceId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const searchFunc = (event) =>{
    // console.log(event.target.value)
    
  }
  const isSelected = (invoiceId) => selected.indexOf(invoiceId) !== -1;

  return (
    <div className={classes.main}>
      <Paper elevation={3} className={classes.paper}>
        <Grid xs={12}>
        <Grid container direction="row" justify="space around" className={classes.header} variant="outlined ">
            <Grid item xs={4} direction="row">
                <Button
                    classes={{ containedPrimary: classes.primary }}
                    variant="contained"
                    color={selected.length>0 ? "secondary" : "primary"}
                    size="small"
                    className={classes.predict}
                >
                    Predict
                </Button>
                <Button
                    className={classes.viewcorrespondance}
                    variant="outlined"
                    color="primary"
                    size="small"
                >
                    View Correspondance
                </Button>
            </Grid>
            <Grid container item xs={8} justify="flex-end">

                <AddFormDialog/>
                
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.edit}

                >
                  <EditIcon fontSize="small" />Edit
                </Button>
                
                <DeleteDialogForm 
                  selected={selected} 
                  remove={remove}
                  onChange={handleRemove}
                  />
                <Paper component="form" className={classes.searchpaper} alignItems='center'>
                    <InputBase
                        className={classes.input}
                        placeholder="Search by Invoice Number"
                        inputProps={{ 'aria-label': 'Search by Invoice Number', size: 'small' }}
                        onChange={optimisedSearch}
                        // onClick={handleSearch}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon color="primary" fontSize="small" />
                    </IconButton>
                </Paper>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid className={classes.infiniteScrollGrid} xs={12}>
        <InfiniteScroll
            dataLength={responseData.length}//length of our responseData
            next={fetchMoreData} //pass the function which will load more data
            hasMore={isNext}   //whether to call next component while scrolling or not.
            scrollableTarget="scrollableDiv"
          >
              <TableContainer className={classes.tablecontainer} id="scrollableDiv">
                <Table className={classes.table} 
                  stickyHeader aria-label="sticky table"
                  className={classes.root}
                  size={'small'}
                >
                  <TableHead >
                  <TableRow>
                  <TableCell >
                    <Checkbox
                      className={classes.checkboxhead}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all invoice' }}
                    />
                  </TableCell>
                    
                      {headCells.map((headCell,index) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? "right" : "left"}
                          padding={headCell.disablePadding ? "none" : "default"}
                        >
                        {headCell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {responseData.map((row, index) => {
                        const isItemSelected = isSelected(row.invoiceId);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            key={index} 
                            style={ isItemSelected ? { background: "#2A5368" } : index % 2 ? { background: "#283A46" } : { background: "#273D49CC" }} 
                            hover
                            onClick={(event) => handleClick(event, row.invoiceId)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.invoiceId}
                            selected={isItemSelected}
                          >
                            <TableCell >
                              <Checkbox
                                className={classes.checkboxcell}
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>

                            
                            <TableCell align="left">{row.nameCustomer}</TableCell>
                            <TableCell align="left">{row.custNumber}</TableCell>
                            <TableCell 
                                align="left"
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                              {row.invoiceId}</TableCell>
                            <TableCell align="right">{row.totalOpenAmount}</TableCell>
                            <TableCell align="right">{row.dueInDate}</TableCell>
                            <TableCell align="right"><h5>-</h5></TableCell>
                            <TableCell align="left"><h5>-</h5></TableCell>
                            <TableCell align="left" style={{ width: 200 }}>{row.notes}</TableCell>
                          </TableRow>
                        );
                    })}
                  </TableBody>
                </Table>
                  <div style={{ height: "50%", paddingLeft: "50%", overflow: "hidden", paddingTop: '10px' }}>
                      <CircularProgress disableShrink color="secondary" className={classes.circularprogess} />
                      <h6 style={{ color: '#C0C6CA' }}>Loading</h6>
                  </div>
              </TableContainer>
          </InfiniteScroll>
        </Grid>
      </Paper>
    </div>
  );
}
