import {Grid, makeStyles, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import React from 'react'
import PanelHeader from './PanelHeader';
import PanelTable from './PanelTable';
import InvoiceForm from './InvoiceForm';
import InfiniteScrollTable from './InfiniteScrollTable';
import '../styles.css'

const useStyles = makeStyles( theme =>({
    main:{
        paddingTop: '20px',
        paddingLeft: '30px',
        paddingRight: '30px'
    },
    invoiceHeader:{
        color: '#fff',
        fontSize: '1rem',
        paddingBottom: '30px'
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#273D49CC',
        width: '1920px',
        height: '75vh'
      },
    PaperForm:{// marging and padding for paper form.
        margin: theme.spacing(5),
        padding:theme.spacing(3)
    }
}))

const InvoiceTable = () => {// records will be our rows & headCells will be our Column
    const classes = useStyles();
    return (
        <div className={classes.main}>
                <Grid container item xs={12} >
                    <Grid item xs={12} className={classes.invoiceHeader}>
                        <span>Invoice List</span>
                    </Grid>
                </Grid>
                <Grid container>
                    <Paper className={classes.paper} elevation={3}>
                        {/* <Typography variant="h6" elevation="5">This is my grid table</Typography> */}
                        <Grid item xs={12}>
                            <PanelHeader/>
                        </Grid>
                        <Grid item xs={12}>
                            <InfiniteScrollTable/>
                            {/* <Paper className={classes.PaperForm}>
                                <InvoiceForm/>
                            </Paper> */}
                            
                        </Grid>
                    </Paper>
                </Grid>
        </div>
    )
}

export default InvoiceTable
