import React from 'react'
import { createAccount } from './Appwrite/auth';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import { logout } from './store/authSlice';
import Login from './Components/Login';
function App() {
  
  return (
    <> 
  <Header /> 
  <main> 
    <button onClick={()=>{logout()}}>Click Here to Logout</button>
  </main>
  <Login />
  <Footer /> 
     
 </> )
}

export default App; 