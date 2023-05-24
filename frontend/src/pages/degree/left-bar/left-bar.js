import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as DegreeSvg } from '~/assets/menu/degree.svg';
import { ReactComponent as MajorsSvg } from '~/assets/menu/majors.svg';
import { ReactComponent as CoursesSvg } from '~/assets/menu/courses.svg';
import { ReactComponent as SettingsSvg } from '~/assets/menu/settings.svg';

function MenuItem({ to, text, icon }) {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? "menuItem active" : "menuItem"}>
      {icon}
      <Menu.Item>{text}</Menu.Item>
    </NavLink>
  )
}

function LeftBar() {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={100}
    >
      <Menu className='degree_menu'>
        <MenuItem
          to="/"
          text="Degree Tracking"
          icon={<DegreeSvg />}
        />
        <MenuItem
          to="/majors"
          text="Major Tracking"
          icon={<MajorsSvg />}
        />
        <MenuItem
          to="/courses"
          text="Courses"
          icon={<CoursesSvg />}
        />
        <MenuItem
          to="/settings"
          text="Settings"
          icon={<SettingsSvg />}
        />
      </Menu>
    </Sider>
  );
}

export default LeftBar;