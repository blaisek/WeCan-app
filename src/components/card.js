import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import clsx from 'clsx';
import ship from '../img/Ship.jpg';
import {auth,db} from '../dataBase/firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    float: 'left',
    margin:'30px'
  },
  media: {
    height: 300,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const  CustomCard = (props) => {

  let key = props.clef;
  const user = auth.currentUser;
  const userId = user.uid;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handledeleteBoat = () => {

    db.collection('users').doc(userId).collection('boats').get().then(querySnapshot => {
      let changes = querySnapshot.docChanges();
      const id = changes[key].doc.id
      db.collection('users').doc(userId).collection('boats').doc(id).delete();
     
     })
   
  }
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ship}
          title="HISSEZ LE PAVILLON !"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="primary" onClick={handledeleteBoat}>
           delete boat
        </Button>
        <Button size="small" color="primary" onClick={handleExpandClick}>
          Books
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
      <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="book"
            label="Add Book Title and Author"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            send
          </Button>
          </DialogActions>
        <Typography gutterBottom variant="h5" component="h2">
          les misérables victor hugo
        </Typography>
      </CardContent>
      </Collapse>
    </Card>
  );
}

export default CustomCard;
