import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PopUp(props) {

  const {open,handleClose,save,boatName,setBoatName} = props;  


  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Boat name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            choose a boat name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="boat name"
            type="name"
            value={boatName}
            onChange={e=> setBoatName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={save} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
