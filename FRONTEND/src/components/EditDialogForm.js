import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditIcon  from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  
});

const useStyles = makeStyles((theme) =>({
    edit_main_btn: {
        marginLeft: theme.spacing(1)
    },
    paper:{
        backgroundColor:theme.palette.primary.dark
    },
    colorTextPrimary:{
        color:'white'
    },
    reset_btn: {
        marginLeft: theme.spacing(1),
        border: `1px solid ${theme.palette.secondary.main}`,
        color:'white',
        background:'#273D49CC'
    },
    save_btn: {
        marginRight: theme.spacing(1),
        color:"white"
      },
    cancel_btn:{
      color:theme.palette.secondary.light,
      marginRight:'12vw',
    },
      root:{
        maxWidth:500,
        height:500,
        margin:'auto',
      },
      TextField:{
        width: 250,  
        color: 'white',
        // padding: '0px 0px',
        fontSize:'1rem',
        border: `1px solid ${theme.palette.secondary.light}`,
        borderRadius: "10px",
        // opacity: "1",
        backgroundColor:theme.palette.primary.dark,
        borderColor:"#356680",
      },
      label:{
        color:"#97A1A9", 
      },
      root:{
        "& .MuiOutlinedInput-input":{
          padding:'5px 0px'
        },
        "& .MuiInputBase-input":{
          color:'white',
          paddingLeft:'5px',
        },
        "& .MuiDialog-paperWidthSm":{
          maxWidth:400
        }
      }
}))

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditDialogForm(props) {
    
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(props.selected)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemove = () => {
    props.onChange(!props.remove);
  };

  const handleEdit = () =>{

  }
  
  return (
    <div>
      
      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.edit_main_btn}
        onClick={handleClickOpen}
    >
      <EditIcon fontSize="small" />Edit
    </Button>
      
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} 
        classes={{
            paper: classes.paper,
            root: classes.root,
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="h6" style={{color:'#FFFFFF'}}>
            Edit Bill
        </Typography>
        </DialogTitle>
        <DialogContent dividers>
        <Grid container spacing={1} direction="row" style={{maxWidth:'60%'}}>
              <Grid item xs={6} > 
                <InputLabel className={classes.label}  >Bill Amount</InputLabel>
              </Grid>
              <Grid item xs={6}>
                <TextField  className={classes.TextField} type="String"  variant="outlined" />
              </Grid>

              <Grid item xs={6}>
                <InputLabel className={classes.label}  >Notes </InputLabel>
              </Grid>
              <Grid item xs={6}>  
                <TextField id="notes" className={classes.TextField}  multiline rows={6} variant="outlined" />
              </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
        <Button
          size="small"
          className={classes.cancel_btn} 
          onClick={handleClose}
        >
            Cancel
        </Button>
        <Button
            variant="contained"
            color="#273D49CC"
            size="small"
            onClick={handleClose}
            className={classes.reset_btn}
        >
           Reset
        </Button>
        <Button
            classes={{ containedPrimary: classes.primary }}
            variant="contained"
            color="secondary"
            size="small"
            className={classes.save_btn}
            onClick={handleEdit}
        >
            Save
        </Button>


        </DialogActions>
      </Dialog>
    </div>
  );
}