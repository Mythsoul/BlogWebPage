import { useState , useEffect} from "react"
import { useDispatch } from "react-redux"
import {login as userLogin, get_current_user , logout as userLogout  } from "./Appwrite";
import { Login , Logout } from "./store/authSlice";
import { Footer, Header } from "./components";
function App() {
const [Loading, setLoading] = useState(false)
const dispatch = useDispatch(); 

useEffect(() => { 
    setLoading(true);
    get_current_user()
        .then((res) => {
            if (res) {
                dispatch(Login(res)); 
                console.log(res);
            } else { 
                dispatch(Logout());
                console.log("user not logged in");
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });
}, []);
  return (
    <>
    <Header /> 
    {Loading && <h1>Loading...</h1>}
    {!Loading && <h1>App</h1>}
<Footer />
</>
  )
}

export default App
