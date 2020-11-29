import {React,useState, useEffect} from 'react';
import Bar from '../components/appBar';
import PopUp from '../components/popUp';
import {auth,db} from '../dataBase/firebase';
import CustomCard from '../components/card';




const Home = () => {

  
  const user = auth.currentUser;
  const userId = user.uid;
  const boats = db.collection('users').doc(userId).collection('boats');
  const [open, setOpen] = useState(false);
  const [boatName,setBoatName] = useState('');
  const [dataReturned ,setDataReturned] = useState(false);
  const [snap,setSnap] = useState('');
  const [books,setBooks] = useState('');

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
          boatname: boatName,
          books: []
        }

        await boats.doc().set(data,{ merge: true })
    }

    const handleChanges = async () => {
       await boats.onSnapshot(Snapshot => {
        let changes = Snapshot.docChanges();
        changes.forEach(change => {
          if(change.type === 'added'){
            getdocument();
          }else if (change.type === 'removed'){
            getdocument();
          }else if (change.type === 'modified'){
            getdocument();
          }
        })
      })
    }
  

    const getdocument = async () => {
    const title = [];
    const books = [];
    await  boats.get().then(querySnapshot => {
            querySnapshot.forEach ((el) => {
              title.push(Object.values(el.data().boatname));
              books.push(Object.values(el.data().books));
          })
     });
     setSnap(title);
     setBooks(books);
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
              <CustomCard key={i} clef={i} title={val} books={books[i]} />
         ))
         :<h1>Waiting for the boat..</h1> 
        }  
    </div>
    );
}


export default Home; 