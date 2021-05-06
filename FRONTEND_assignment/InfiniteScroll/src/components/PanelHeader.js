import {AppBar,fade, Button, Grid, makeStyles, Toolbar, Typography, TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import React from 'react'
import theme from '../utils/theme';
import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) =>({
    predict:{
        marginRight: theme.spacing(1) 
    },
    add:{
        marginLeft: theme.spacing(1) 
    },
    edit:{
        marginLeft: theme.spacing(1) 
    },
    delete:{
        marginLeft: theme.spacing(1) 
    },
    header:{
        padding: '30px 30px'
    },
    input:{
        color:'white',
        fontSize:'0.6rem',
        marginLeft: theme.spacing(1),
        flex:1,
    },
    
    labelroot:{
        fontSize:'0.5rem',
        color:theme.palette.primary
    },
    searchpaper:{
        backgroundColor:theme.palette.primary.dark,
        height:'30px',
        marginLeft: theme.spacing(1),
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 200,
        border:`1px solid ${theme.palette.secondary.main}`
    }
}))

const PanelHeader = () => {
    const classes = useStyles();
    return (
        
        
        // <div>
        <Grid container direction="row" justify="space around" className={classes.header} variant="outlined ">
            <Grid item xs={4} direction="row">
                <Button
                variant="contained"
                color="primary"
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

            <Button 
                variant="outlined"
                color="primary"
                size="small"
                className={classes.add}
                >
                <AddIcon fontSize="small"/>Add
                </Button>

                <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.edit}
                >
                <EditIcon fontSize="small"/>Edit
                </Button>

                <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.delete}
                >
                <RemoveIcon fontSize="small" /> Delete
                </Button>
                
                <Paper component="form" className={classes.searchpaper} alignItems='centere'>
                    <InputBase
                        className={classes.input}
                        placeholder="Search by Invoice Number"
                        inputProps={{ 'aria-label': 'Search by Invoice Number' ,size:'small'}}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon color="primary" fontSize="small"/>
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
        
    )
}

export default PanelHeader
