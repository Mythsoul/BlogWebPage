import {  NavLink } from "react-router-dom"
import LogoutBtn from "./LogoutBtn"
import { get_current_user } from "../../Appwrite"
import { useSelector } from "react-redux"
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);
  return (
    <header className="bg-gray-800 text-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="font-bold text-2xl">Blog</div>
      <nav className="flex space-x-4">
        <NavLink exact activeClassName="bg-gray-700" to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300">Home</NavLink>
        <NavLink activeClassName="bg-gray-700" to="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300">About</NavLink>
      </nav>
      <div className="flex space-x-4">
      {!authStatus &&  <>
      <NavLink to="/login" activeClassName="bg-blue-700" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">Login</NavLink>
      <NavLink to="/signup" activeClassName="bg-green-700" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300">Sign Up</NavLink>
      </>}
      {authStatus && <LogoutBtn />}
      </div>
    </header>
  )

}

export default Header
