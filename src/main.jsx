import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Signup  from './components/Signup.jsx'

import Store from './store/store.js'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
,
{
  path : "/signup", 
  element : <Signup />
}, 
{path : "/login" , element : <Login />}, 
{
  path : "/logout" , element : <h1>Logout</h1>
}, 
{
  path : "/about" , element : <h1>About</h1>
}, 
{path : "/post/:id" , element : <h1>Post</h1>}, 

]);
createRoot(document.getElementById('root')).render(
  
  <StrictMode>

    <Provider store={Store}>
<RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
