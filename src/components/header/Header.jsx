import { useSelector} from "react-redux"
import Button from "../Button"

function Header() {
const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus)

  return (
    <nav className="bg-gray-800 p-4 flex justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-900 p-2 rounded-lg">
          <span className="text-white font-bold text-2xl">Logo</span>
        </div>
        <ul className="flex space-x-4 text-white">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
      {!authStatus && <>
        <Button name="Signin" />
        <Button name="Signup" /></>
        }
      {authStatus && <Button name="Logout" />}
      </div>
    </nav>
  )
}

export default Header