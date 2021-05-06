import { Grid, TextField, makeStyles } from '@material-ui/core';
// import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import React,{useState,useEffect} from 'react'


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': { // & refers to parent and .MuiFormControl-root will apply to all field 
            width:'80%',
            margin:theme.spacing(1),
            color: 'white'
        }
    }
}))

const initialFvalues = {
    customerName:'',
    customerNumber:'',
    invoiceNo:'',
    invoiceAmount:'',
    dueInDate:'',
    notes:''
}

const InvoiceForm = () => {

    const [values,setValues] = useState(initialFvalues);
    const classes = useStyles();

    const handleInputChange = e =>{
        const {name,value} = e.target // event name and value will be assigned
        setValues({
            ...values,
            [name]:value  // only the changed field value will be assigned 
        })

    }
    return (
            <form className={classes.root}>
                <Grid container>
                    <Grid container item xs={6} >
                        <TextField
                            variant="outlined"
                            label="Customer Name"
                            name="customerName"
                            value={values.customerName}
                            onChange = {handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Customer Number"
                            name="customerNumber"
                            value={values.customerNumber}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid container item xs={6} > </Grid>
                </Grid>
            </form>
    )
}

export default InvoiceForm
