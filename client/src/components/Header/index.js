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

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar {...args} className="nav-background">
    <NavbarBrand>
        <Link to="/" className="nav-title">
          <h1>GITINIT TO WIN IT</h1>
        </Link>
    </NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
      <Nav className="me-auto" navbar>
      <div >
        <nav >
          {Auth.loggedIn() ? (
            <>
            <NavItem>
              <NavLink><Link to="/Dashboard" className="nav-link">Dashboard</Link></NavLink>
            </NavItem>
              <a href="/" className="nav-link" onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/"></Link>
            </>
          )}
        </nav>
      </div>
      </Nav>
        </Collapse>
      </Navbar>
  );
};

export default Header;