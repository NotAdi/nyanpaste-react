import React from 'react';

const Header = ({ canSave, handleSave, handleCustomNameChange }) => {

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
        <a href="/new" className="button">
          New
        </a>
        <button className="button">Button 3</button>
      </div>
    </header>
  );
};

export default Header;
