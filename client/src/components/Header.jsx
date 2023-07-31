import React, { useContext, useEffect} from "react";
import {Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from './AuthContext';
import axios from "axios";

const Header = ({
  canSave,
  handleSave,
  handleCustomNameChange,
}) => {
  const {authenticated, setAuthenticated} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    // Check for the authentication token in localStorage when the app mounts
    const authToken = localStorage.getItem('authToken');
    setAuthenticated(!!authToken); // Set the authenticated state based on the presence of the token
  }, [setAuthenticated]);
  
  const handleNew = () => {
    // Clear the local storage data
    localStorage.removeItem("code");

    navigate(`/new`);
    if (location.pathname === "/new") navigate(0);
  };

  const handleLogout = async () => {
    try{
    // Clear the authentication token from local storage
    localStorage.removeItem('authToken');

    // await axios.post(`/logout`);
    setAuthenticated(false);
    // Redirect the user to the home page or any other public route
    navigate(`/`);
    // navigate(0);
    }catch(error){
      console.log(error);

    }
  };

  return (
    <header>
      <a
        href="/"
        className="logo"
      >
        NyanPaste
      </a>
      <div className="buttons">
        {authenticated ? (
          // If authenticated, show a logout button
          <>
          <button
            className="button"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link
            to="/dashboard"
            className="button"
          >
            Dashboard
          </Link>
        </>
        ) : (
          // If not authenticated, show login and register buttons
          <>
            <Link
              to="/login"
              className="button"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="button"
            >
              Register
            </Link>
          </>
        )}

        {canSave && (
          <>
            <input
              type="text"
              id="customNameInput"
              name="customName"
              onChange={handleCustomNameChange}
              placeholder="Custom name"
            />
            <button
              className="button"
              type="submit"
              onClick={handleSave}
            >
              Save
            </button>
          </>
        )}
        <button
          className="button"
          type="button"
          onClick={handleNew}
        >
          New
        </button>
      </div>
    </header>
  );
};

export default Header;
