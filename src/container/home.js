import {React,useState, useEffect} from 'react';
import Bar from '../components/appBar';
import PopUp from '../components/popUp';
import {auth,db} from '../dataBase/firebase';
import CustomCard from '../components/card';




const Home = () => {

  
  const user = auth.currentUser;
  const userId = user.uid;
  const boats = db.collection('users').doc(userId).collection('boats');
  // const books = boats.collection('books'); //à ajouter title et author
  const [open, setOpen] = useState(false);
  const [boatName,setBoatName] = useState('');
  const [dataReturned ,setDataReturned] = useState(false);
  const [snap,setSnap] = useState('');

      const handleLogOut = () => {
        auth.signOut();
      }

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

    const handleChanges =  () => {
        boats.onSnapshot(Snapshot => {
        let changes = Snapshot.docChanges();
        changes.forEach(change => {
          if(change.type == 'added'){
            getdocument();
          }else if (change.type == 'removed'){
            getdocument();
          }
        })
      })
    }
  

    const getdocument = async () => {
    const data = [];
     await  boats.get().then(querySnapshot => {
            querySnapshot.forEach ((el) => {
              data.push(Object.values(el.data()).toString());
          })
     });
     setSnap(data);
     setDataReturned(true);
  }

    useEffect(() => {

      handleChanges();
     
    },[])

    

    return (
    <div>
      <Bar handleLogOut={handleLogOut} handleClickOpen={handleClickOpen}/>
        <PopUp open={open} handleClose={handleClose} save={createBoat}
         boatName={boatName} setBoatName={setBoatName}/>
         {
          dataReturned ?
          snap.map((val,i) => (
            <CustomCard key={i} clef={i} title={val} />
         ))
         :<h1>loading..</h1> 
        }  
    </div>
    );
}


export default Home; 