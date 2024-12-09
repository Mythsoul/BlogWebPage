import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Appwrite/auth';
import { logout } from '../../store/Authslice';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl">Logo</Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/posts" className="text-white hover:text-gray-300">Posts</Link>
            </li>
            {authStatus && (
              <li>
                <Link to="/create-post" className="text-white hover:text-gray-300">Create Post</Link>
              </li>
            )}
            {!authStatus ? (
              <>
                <li>
                  <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

