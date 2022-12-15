import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header >
      <div >
        <Link to="/">
          <h1>GITINIT TO WIN IT</h1>
        </Link>

        <nav >
          {Auth.loggedIn() ? (
            <>
              <Link to="/Dashboard">Dashboard</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/"></Link>
              
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;