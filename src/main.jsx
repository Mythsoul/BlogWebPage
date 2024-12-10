import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store from "./store/store.js";
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import './index.css'
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import ProtectedRoutes from './Components/Authlayout.jsx';
const router = createBrowserRouter([
  { 
    path : "/" ,
    element : <App />
  } , { 
    path: "/login" , 
    element : 
    <ProtectedRoutes>
    <LoginPage /> 
    </ProtectedRoutes>

  } , 
  { 
    path : "/signup", 
    element : <> <ProtectedRoutes> <SignupPage /></ProtectedRoutes></> 
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
