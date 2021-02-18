import React from 'react';
import './Navbar.css';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <img src={logo} alt="logo" height="50" width="175" />
      </div>

      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>

        <a href="#">
          <i class="fa fa-user-circle" aria-hidden="true"></i>{' '}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
