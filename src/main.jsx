import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store from "./store/store.js";
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import './index.css'
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';

const router = createBrowserRouter([
  { 
    path : "/" ,
    element : <App />
  } , { 
    path: "/login" , 
    element : <Login /> 

  } , 
  { 
    path : "/signup", 
    element : <Signup /> 
  }
])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
  
  <Provider store={Store}>
    <RouterProvider router={router}>
        <App /> 
        </RouterProvider>
     </Provider>
  </StrictMode>
);
