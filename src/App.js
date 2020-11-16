import {React,useEffect} from 'react'
import './App.css';
import api from './service/dbService';


function App() {

useEffect(()=> {

  api.fetchUserData();

},[]);



  return (
    <div className="App">
      <header className="App-header">
       <h1> Welcome to bateau library</h1>
      </header>

    </div>
  );
}

export default App;
