import React, { useEffect } from 'react'
import {  IsuserLoggedIn, logoutUser } from './Appwrite/auth';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/Authslice';
import { Routes , Route } from 'react-router-dom';
import {createPost} from './Appwrite/config';

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
    <button onClick={()=>{createPost("title" , "ehehe" , "eeu8484948" , "published" , "23994894")}}>Add Post </button>
  </main>
 
  <Footer /> 
     
 </> )
}

export default App; 