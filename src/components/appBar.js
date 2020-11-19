import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Bar = (props) => {

    const classes = useStyles();

    return (

     <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button edge="start" color="inherit" onClick={props.handleClickOpen}>Create Boat</Button>
            <Typography variant="h6" className={classes.title}>
            Boat Library
            </Typography>
            <Button color="inherit" onClick={props.handleLogOut}>LogOut</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
}

export default Bar;

