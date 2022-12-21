import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import LoginModal from '../Modal/LoginModal';
import SignUpModal from '../Modal/SignUpModal';

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let installed = localStorage.getItem('installed');

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const install = (event)=> {
    event.preventDefault();

    if (!window.deferredPrompt) {
      return;
    }
        window.deferredPrompt.prompt();
        window.deferredPrompt = null;
        event.target.setAttribute('disabled', true);
        event.target.textContent = 'Installed!';
        localStorage.setItem('installed', true);
        installed = true;
    };
  

  window.addEventListener('beforeinstallprompt', (event) =>{
    window.deferredPrompt = event;
  });


  return (
    <div >
      <Navbar {...args} className="nav-background">
        <NavbarBrand href="/" className="nav-title">
          <h1>GITINIT TO WIN IT</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

            {Auth.loggedIn() ? (
              <>
                <NavItem>
                  <NavLink href="/Dashboard" className="nav-link">Dashboard</NavLink>
                </NavItem>
                <NavLink href="/" className="nav-link" onClick={logout}>Logout</NavLink>
              </>
            ) : (
              <>
                <LoginModal />
                <SignUpModal />
              </>
            )}
            {!installed &&
            <Link id="installBtn" className="nav-link" height="48px" onClick={install}>INSTALL</Link>}
          </Nav>
        </Collapse>
      </Navbar>
      <div className="background-image">
        <div className="opening-text font">
          Keep track of board game scores with your friends!
        </div>
      </div>
    </div>
  );
};

export default Header;