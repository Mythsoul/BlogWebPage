import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '@/appwrite/auth'
import { logout } from '@/store/authSlice' 
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuItem } from "../ui/dropdown-menu"

function LogoutBtn() {
    const dispatch = useDispatch()
    const [loggingOut, setLoggingOut] = useState(false)

    const logoutHandler = () => {
        setLoggingOut(true)
        authService.logout().then(() => {
            dispatch(logout())
        })
        .finally(() => setLoggingOut(false))
    }

    return (
        <DropdownMenuItem
            disabled={loggingOut}
            onClick={logoutHandler}
        >
            <LogOut className="w-4 h-4 mr-2" />
            {loggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
    )
}

export default LogoutBtn

