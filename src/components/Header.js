import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ canSave, handleSave, handleCustomNameChange }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleNew = () => {
    // Clear the local storage data
    localStorage.removeItem("code");

    navigate(`/new`);
    if(location.pathname === '/new')
      navigate(0);
  };

  return (
    <header>
      <a href="/" className="logo">
        NyanPaste
      </a>
      <div className="buttons">
        {canSave && (
          <>
            <input
              type="text"
              id="customNameInput"
              name="customName"
              onChange={handleCustomNameChange}
              placeholder="Custom name"
            />
            <button className="button" type="submit" onClick={handleSave}>
              Save
            </button>
          </>
        )}
        <button className="button" type="button" onClick={handleNew}>New</button>
      </div>
    </header>
  );
};

export default Header;
