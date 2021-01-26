import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import MonitorOutlined from '@ant-design/icons/MonitorOutlined';
import PieChartOutlinedIcon from '@material-ui/icons/PieChartOutlined';
import { useSelector } from 'react-redux';
import { HistoryOutlined } from '@material-ui/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const user = useSelector(state => state.CURRENT_USER);
  const history = useHistory();
  const [collapsed, setCollapsed] = React.useState(true);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const redirectToUserProfile = () => {
    history.push('/me');
  };

  const redirectToAnalytics = () => {
    history.push('/analytics');
  };

  const redirectToIntake = () => {
    history.push('/intake');
  };

  const redirectToGuests = () => {
    history.push('/guests');
  };

  const redirectToFamily = () => {
    history.push('/family');
  };

  const redirectToMembers = () => {
    history.push('/members');
  };

  const redirectToCaseManagerAnalytics = () => {
    history.push('/caseAnalytics');
  };

  const redirectToCheckIn = () => {
    history.push('/supervisor-checkin');
  };

  return (
    <div>
      {user.role && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          id="sider"
        >
          <div className="logo" />

          <Menu theme="light" mode="inline">
            <br />
            <Menu.Item
              onClick={redirectToAnalytics}
              key="2"
              icon={<BarChartOutlined />}
            >
              Analytics
            </Menu.Item>
            {user.role == 'guest' && (
              <Menu>
                <Menu.Item
                  onClick={redirectToMembers}
                  key="3"
                  icon={<TeamOutlined />}
                >
                  Members
                </Menu.Item>
              </Menu>
            )}

            {['supervisor', 'executive_director', 'case_manager'].includes(
              user.role
            ) && (
              <Menu>
                <Menu.Item
                  onClick={redirectToGuests}
                  key="3"
                  icon={<MonitorOutlined />}
                >
                  Guests
                </Menu.Item>
                <Menu.Item
                  onClick={redirectToIntake}
                  key="4"
                  icon={<FileOutlined />}
                >
                  Register Family
                </Menu.Item>
                {user.role == 'case_manager' && (
                  <Menu.Item
                    onClick={redirectToCaseManagerAnalytics}
                    key="5"
                    icon={<PieChartOutlinedIcon />}
                  >
                    Case Manager Analytics
                  </Menu.Item>
                )}
              </Menu>
            )}

            {user.role == 'supervisor' && (
              <Menu>
                <Menu.Item
                  onClick={redirectToCheckIn}
                  key="5"
                  icon={<TeamOutlined />}
                >
                  Check-in Guests
                </Menu.Item>
              </Menu>
            )}
          </Menu>
        </Sider>
      )}
    </div>
  );
};

export default SideBar;
