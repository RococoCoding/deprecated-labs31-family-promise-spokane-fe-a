import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
function RenderHomePage(props) {
  const user = useSelector(state => state.CURRENT_USER);
  // React.useEffect(() => {
  // }, [user]);

  if (!user.role) {
    return <div test-id="waiting">Waiting..</div>;
  }

  switch (user.role) {
    case 'guest':
      return <Redirect to="guest-dashboard" />;
    case 'supervisor':
      return <Redirect to="/guests" />;
    case 'case_manager':
      return <Redirect to="/caseAnalytics" />;
    case 'executive_director':
      return <Redirect to="/executive-director-dashboard" />;
    case 'pending':
      return <Redirect to="/guest-dashboard" />;
    default:
      return <Redirect to="/login" />;
  }
}
export default RenderHomePage;
