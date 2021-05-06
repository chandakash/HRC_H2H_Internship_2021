import React, { useState } from 'react';
import theme, { pxToVh } from '../utils/theme';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import Header from '../components/Header';
// import InvoiceTable from '../components/InvoiceTable';
// import InceptionScroll from '../extra/InceptionScroll';
// import InvoicePanelTable from './../components/InvoicePanelTable';
import DebounceAssignment from '../components/DebounceAssignment';
// import PanelHeader from '../components/PanelHeader';
import '../styles.css'

const useStyles = makeStyles({
    mainDashboard: {
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        background: 'transparent radial-gradient(closest-side at 50% 50%, #58687E 0%, #39495E 100%) 0% 0% no-repeat padding-box',
        opacity: '1'
    }
})

const InvoiceDashboard = () => {
    
    const classes = useStyles();
    return (
        <div className={classes.mainDashboard}>
            <Header/>
            {/* <PanelHeader/> */}
            <DebounceAssignment/>
            {/* <InvoicePanelTable/> */}
            {/* <InvoiceTable/> */}
            
        </div>
        
    )
}

export default InvoiceDashboard
