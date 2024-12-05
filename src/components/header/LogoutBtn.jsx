import { useDispatch } from "react-redux"
import { logout as userlogout } from "../../Appwrite";
import { Logout } from "../../store/authSlice";
function LogoutBtn() {

const dispatch = useDispatch();
const logoutHandler = () => {
    const response = userlogout(); 
    if (response) {
        dispatch(Logout());
    }
}
    return (

 <button onClick={logoutHandler} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">Logout</button>

  )
}

export default LogoutBtn