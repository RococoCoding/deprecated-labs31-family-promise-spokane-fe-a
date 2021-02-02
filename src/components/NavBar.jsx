import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useOktaAuth } from '@okta/okta-react';

const NavBar = () => {
  const history = useHistory();
  const { authState, authService } = useOktaAuth();

  const redirectToLogin = () => {
    history.push('/login');
  };

  const redirectToHome = () => {
    if (authState.isAuthenticated) {
      history.push('/');
    } else {
      return;
    }
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.clear();
  };

  return (
    <div className="navbar">
      <div className="navbar-icon">
        <img src={logo} alt="" onClick={redirectToHome} />
      </div>

      {authState.isAuthenticated ? (
        <div className="navbar-actions" onClick={handleLogout}>
          <li>Logout</li>
        </div>
      ) : (
        <div className="navbar-actions" onClick={redirectToLogin}>
          <li>Login</li>
        </div>
      )}
    </div>
  );
};

export default NavBar;
