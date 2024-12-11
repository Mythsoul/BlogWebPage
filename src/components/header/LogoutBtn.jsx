import {useState }from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { LogOut } from 'lucide-react'
import React from 'react'
function LogoutBtn() {
    const dispatch = useDispatch(); 
    const [loggingout, setloggingout] = useState(false)
    const logoutHandler = () => {
        setloggingout(true)
        authService.logout().then(() => {
            dispatch(logout())
        })
        .finally(() => setloggingout(false))
    }
  return (
    <button disabled = {loggingout}
    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
    onClick={logoutHandler}>
    <LogOut className="w-4 h-4 mr-2" />    
     {loggingout ? "Logging out..." : "Logout"}
   </button>
  )
}

export default LogoutBtn