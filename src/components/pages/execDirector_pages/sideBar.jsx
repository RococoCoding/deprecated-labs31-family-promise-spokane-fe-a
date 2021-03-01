import React from 'react';
import './Sidebar.css';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? 'sidebar_responsive' : ''} id="sidebar">
      <div className="sidebar__title">
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            My Dashboard
          </a>
        </div>
        <h2>Operations</h2>
        <div className="sidebar__link">
          <i className="fa fa-user-secret" aria-hidden="true"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            Management Duties
          </a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-clipboard"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            Case Management
          </a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-building-o"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            Analtyics
          </a>
        </div>

        <div className="sidebar__link">
          <i className="fa fa-user-o"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            Current Guests
          </a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-envelope"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            Messages
          </a>
        </div>

        <div className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            Resources
          </a>
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="https://github.com/Lambda-School-Labs/family-promise-spokane-fe-a">
            Log out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
