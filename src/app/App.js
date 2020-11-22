import {React,useEffect,useState} from 'react'
import './App.css';
import SingUp from '../components/signUp';
import {auth} from '../dataBase/firebase';
import Home from '../container/home';

function App() {
  
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [hasAccount,setHasAccount] = useState(true);  
const [user,setUser] = useState(''); 
const [emailError,setEmailError] = useState('');  
const [passWordError,setPassWordError] = useState('');

const  clearInputs = () => {
  setEmail('');
  setPassword('');
} 



useEffect(()=> {

  auth.onAuthStateChanged(user => {

    if(user){
        clearInputs();
        setUser(user) ;
    }else{
        setUser('') ;
    }

})

},[]);

  return (
    <div className="App">

      {
        user ?(
        <Home />
        ):
        (
        <SingUp email={email} setEmail={setEmail} password ={password} setPassword={setPassword} 
        emailError ={emailError} setEmailError ={setEmailError} 
        passWordError={passWordError} setPassWordError={setPassWordError}
        hasAccount={hasAccount} setHasAccount={setHasAccount}/>
        )
      }

    </div>
  );
}

export default App;
