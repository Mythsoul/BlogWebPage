import React, { useEffect } from 'react'
import {  IsuserLoggedIn, logoutUser } from './Appwrite/auth';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';

import { useDispatch } from 'react-redux';
import { login, logout } from './store/Authslice';

import { Routes , Route } from 'react-router-dom';
function App() {
 const dispatch = useDispatch(); 
  useEffect(()=>{ 
     IsuserLoggedIn()
     .then((res)=>{
      if(res){
        dispatch(login(res))}
        else{
          dispatch(logout());
        }; 
     }).catch((err)=>{
       console.log(err);
     }); 
    
   
 } , []);
 
 
  return (
  
    <> 

  <Header /> 
  <main> 
    <button onClick={()=>{dispatch(logout()) , logoutUser()}}>Click Here to Logout</button>
  </main>
 
  <Footer /> 
     
 </> )
}

export default App; 