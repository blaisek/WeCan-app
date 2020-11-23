import {React,useState, useEffect} from 'react';
import Bar from '../components/appBar';
import PopUp from '../components/popUp';
import {auth,db} from '../dataBase/firebase';
import CustomCard from '../components/card';

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
  const snap = [];

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const clearInputs = () => {
          setBoatName('')
      };

      const  createBoat =  async () => {

        clearInputs();
        handleClose();

        const data = {
          boatname: boatName
        }

        await boats.doc().set(data,{ merge: true })
    }

    // TODO loop render custom card component
    const getdocument = async () => {

      await  boats.get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
        snap.push(doc.data());
        console.log(snap);
       })
     });

    
    }

    useEffect(() => {
      getdocument();
    },[])


    return (
    <div>
      <Bar handleLogOut={handleLogOut} handleClickOpen={handleClickOpen}/>
        <PopUp open={open} handleClose={handleClose} save={createBoat}
         boatName={boatName} setBoatName={setBoatName}/>
         {/* <CustomCard title='maryJane'/> */}
         { 
            snap.map((d,i)=> {
            return  <CustomCard key={i} title={d}/>
             })
          
        }
    </div>
    );
}


export default Home; 