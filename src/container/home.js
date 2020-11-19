import {React,useState} from 'react';
import Bar from '../components/appBar';
import PopUp from '../components/popUp';
import firebase from '../dataBase/firebase';

const handleLogOut = () => {
    
    firebase.auth().signOut();
  }

const getUid = () => {
    const user = firebase.auth().currentUser;
    return user.email; 
}
const boats = [];


const Home = () => {


    const [open, setOpen] = useState(false);
    const [boatName,setBoatName] = useState('');
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const clearInputs = () => {
          setBoatName('')
      }

      const save = () => {
        clearInputs();
        handleClose();
        boats.push(boatName);
        firebase.firestore().collection('users').doc('Boats').set({boatName});
        console.log(boats);
    }


    return (
    <div>
      <Bar handleLogOut={handleLogOut} handleClickOpen={handleClickOpen}/>
        <h1>Welcome {getUid()}</h1>
        <PopUp open={open} handleClose={handleClose} save={save}
         boatName={boatName} setBoatName={setBoatName}/>

    </div>
    );
}


export default Home; 