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

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

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