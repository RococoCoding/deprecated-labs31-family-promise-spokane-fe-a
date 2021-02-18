import React from 'react';
import './Sidebar.css';
import logo from '../../assets/logo.png';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? 'sidebar-responsive' : ''} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img"></div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__link">
        <i className="fa fa-home"></i>
        <a href="#">My Dashboard</a>
      </div>
      <h3>Operations</h3>
      <div className="sidebar__link">
        <i className="fa fa-bar-chart"></i>
        <a href="#">Analytics</a>
      </div>
      <div className="sidebar__link">
        <i className="fa fa-file-text-o"></i>
        <a href="#">Case Management</a>
      </div>
      <div className="sidebar__link">
        <i className="fa fa-user-secret"></i>
        <a href="#">Current Guests</a>
      </div>
      <div className="sidebar__link">
        <i className="fa fa-envelope-square"></i>
        <a href="#">Messages</a>
      </div>
      <div className="sidebar__link">
        <i className="fa fa-wrench"></i>
        <a href="#">Resources</a>
      </div>
      <div className="sidebar__link">
        <i className="fa fa-power-off"></i>
        <a href="#">Log Out</a>
      </div>
    </div>
  );
};

export default Sidebar;
