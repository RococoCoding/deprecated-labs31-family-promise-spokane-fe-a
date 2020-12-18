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

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
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

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      id="sider"
    >
      <div className="logo" />
      <Menu theme="light" mode="inline">
        <Menu.Item
          onClick={redirectToUserProfile}
          key="1"
          icon={<UserOutlined />}
        >
          Profile
        </Menu.Item>
        <br />
        <Menu.Item
          onClick={redirectToAnalytics}
          key="2"
          icon={<BarChartOutlined />}
        >
          Analytics
        </Menu.Item>
        <Menu.Item
          onClick={redirectToGuests}
          key="3"
          icon={<MonitorOutlined />}
        >
          Guests
        </Menu.Item>
        <Menu.Item onClick={redirectToIntake} key="4" icon={<FileOutlined />}>
          Register Family
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
