import React from 'react';
import './Navbar.css';
import logo from './execLogo.png';

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar__img"></div>
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <img src={logo} height="50px" width="200px" alt="logo" />
      </div>
      <div className="navbar__right">
        <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a"></a>
      </div>
    </nav>
  );
};

export default Navbar;
