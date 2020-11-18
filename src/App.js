import {React,useEffect,useState} from 'react'
import './App.css';
import SingUp from './components/signUp';
import firebase from './dataBase/firebase';
import Home from './container/home';

function App() {
  
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [hasAccount,setHasAccount] = useState(false);  
const [user,setUser] = useState(''); 
const [emailError,setEmailError] = useState('');  
const [passWordError,setPassWordError] = useState('');

const  clearInputs = () => {
  setEmail('');
  setPassword('');
} 

const handleLogOut = () => {
    
  firebase.auth().signOut();
}

const authListener = () => {

  firebase.auth().onAuthStateChanged(user => {

      if(user){
          clearInputs();
          setUser(user) ;
      }else{
          setUser('') ;
      }

  })

}

useEffect(()=> {

  authListener();

},[]);

  return (
    <div className="App">

      <body>
      {
        user ?(
        <Home handleLogOut={handleLogOut}/>
        ):
        (
        <SingUp email={email} setEmail={setEmail} password ={password} setPassword={setPassword} 
        emailError ={emailError} setEmailError ={setEmailError} 
        passWordError={passWordError} setPassWordError={setPassWordError}
        hasAccount={hasAccount} setHasAccount={setHasAccount}/>
        )
      }
      </body>

    </div>
  );
}

export default App;
