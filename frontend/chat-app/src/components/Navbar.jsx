import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authcheck} from '../patanhi/authEv';

const Navbar = () => {
  const { logout, authUser } = authcheck();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();     
    navigate('/loginemail');
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      {authUser ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/loginemail">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
