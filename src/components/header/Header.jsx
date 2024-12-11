import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Home, BookOpen, PlusCircle, User, LogOut, Menu } from 'lucide-react'
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      icon: <Home className="w-5 h-5" />,
      active: true
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      icon: <BookOpen className="w-5 h-5" />,
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      icon: <PlusCircle className="w-5 h-5" />,
      active: authStatus,
    },
  ]

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="./assets/react.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-800">BlogHub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => 
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </button>
              ) : null
            )}
            {authStatus ? (
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
                  <User className="w-5 h-5" />
                  <span className="ml-2">Account</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <button onClick={() => navigate('/profile')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <LogoutBtn />
                
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Login
              </button>
            )}
          </nav>
          <button className="md:hidden text-gray-600 hover:text-gray-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
