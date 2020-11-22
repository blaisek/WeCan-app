import {React,useState} from 'react';
import Bar from '../components/appBar';
import PopUp from '../components/popUp';
import {auth,db} from '../dataBase/firebase';

const handleLogOut = () => {
    auth.signOut();
  }


const Home = () => {

  const user = auth.currentUser;
  const userId = user.uid;
  // const boat = db.collection('users'/'userId').doc('boats'); //à ajouter boatName
  const boats = db.collection('users').doc(userId).collection('boats');
  // const books = boat.collection('books'); //à ajouter title et author
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
      };

      const  addBoat =  async () => {

        clearInputs();
        handleClose();

        const data = {
          'boatname': boatName
        }

        await boats.doc().set(data,{ merge: true })
    }


    return (
    <div>
      <Bar handleLogOut={handleLogOut} handleClickOpen={handleClickOpen}/>
        <PopUp open={open} handleClose={handleClose} save={addBoat}
         boatName={boatName} setBoatName={setBoatName}/>

    </div>
    );
}


export default Home; 