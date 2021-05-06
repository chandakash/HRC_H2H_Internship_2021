import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { Fragment, useState } from "react";
import Grid from '@material-ui/core/Grid';
const useStyle = makeStyles((theme) => ({
  add: {
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    color:theme.palette.primary.main,
    background:'#273D49CC'
},
root:{
  maxWidth:900,
  height:500,
  margin:'auto',
},
paperWidthSm:{
  maxWidth:900,
},
label:{
  color:"#97A1A9",
  
},
button:{
        float:"right",
    },
TextField:{
      width: 250,  
      color: 'white',
      padding: '0px 0px',
      fontSize:'1rem',
      border: "1px solid #356680",
      borderRadius: "10px",
      opacity: "1",
      backgroundColor:"#283A46",
      borderColor:"#356680",
    },
add_btn:{
    margin: theme.spacing(1),
    color:"#FFFFFF",
    backgroundColor:"#14AFF1",
},
colour:{
  borderColor:"#14AFF1"
},
root:{
  "& .MuiOutlinedInput-input":{
    padding:'5px 0px'
  },
  "& .MuiInputBase-input":{
    color:'white',
    paddingLeft:'5px'
  }

  
}
    
}));
export default function AddFormDialog() {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, handleDateChange] = useState(new Date());
   
    const classes=useStyle();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const DialogContent = withStyles(theme => ({
      root: {
        backgroundColor:"#2A3E4C",
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
        // width:1000,
      },
    }))(MuiDialogContent);
    
    const DialogActions = withStyles(theme => ({
      root: {
        backgroundColor:"#2A3E4C",
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
      },
    }))(MuiDialogActions);
    return (
        <div>
          <Button
            variant="contained"
            color="#273D49CC"
            size="small"
            onClick={handleClickOpen}
            className={classes.add}
          >
              <AddIcon fontSize="small"/>  Add
          </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
            classes={{
            paper: classes.paper,
            root: classes.root,
            paperWidthSm:classes.paperWidthSm
            }}
            >
                <DialogTitle id="form-dialog-title" style={{backgroundColor:"#2A3E4C"}}><font color='white'>Add Invoice</font>
                <Button aria-label="close" onClick={handleClose} endIcon={<CloseIcon />} className={classes.button}> </Button>
            </DialogTitle>
            
            <DialogContent>
            <form>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={2}> 
                <InputLabel className={classes.label}  >Customer Name <font color="red">*</font></InputLabel>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField  className={classes.TextField} type="String"  variant="outlined" />
              </Grid>
              <Grid item xs={6} sm={2}>
                <InputLabel className={classes.label}  >Due Date <font color="red">*</font></InputLabel>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField  className={classes.TextField} type="number"  variant="outlined" />
              </Grid>
             
              <Grid item xs={6} sm={2}>
              <InputLabel className={classes.label}   >Customer No. <font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6} sm={4}>
              <TextField  className={classes.TextField} type="number"  variant="outlined"/></Grid>
              
              <Grid item xs={6} sm={2} >
              <InputLabel className={classes.label}  >Notes <font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6} sm={4} >  
              <TextField id="notes" className={classes.TextField}  multiline rows={6} variant="outlined"/></Grid>
              
              <Grid item xs={6}  sm={2}>
              <InputLabel className={classes.label}  >Bill No. <font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6}  sm={4}>
              <TextField  className={classes.TextField} type="number"  variant="outlined"/></Grid>
              <Grid item xs={6}  sm={2}>
              <InputLabel className={classes.label}  >Bill Amount <font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6}  sm={4}>
              <TextField className={classes.TextField} type="number"  variant="outlined"/></Grid>
              </Grid>
              </form>

            </DialogContent>
            <DialogActions>
              <div className="ButtonHeader">

              <div className="right">
              <Button variant="outlined" color="#2C404E" className={classes.colour}  color="#FFFFFF" style={{color:"#FFFFFF",
                  borderBlockColor:"#14AFF1",
                  borderColor:"#14AFF1"}} onClick={handleClose} color="primary">
                Clear
              </Button>
              <Button variant="contained" className={classes.add_btn}>
               Add
              </Button>
              </div>
              </div>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
