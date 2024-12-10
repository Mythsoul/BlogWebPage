import { Outlet , Navigate} from "react-router-dom"
import { useSelector } from "react-redux";

function ProtectedRoutes({children}) {
  const auth = useSelector((state) => state.auth);
  if (auth.status) {
    return <Navigate to="/" /> 
  }
  return children
 
}

export default ProtectedRoutes