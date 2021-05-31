import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/applications">Applications</Link></Menu.Item>
        <Menu.Item key="3">Chat</Menu.Item>
        <Menu.Item key="4">Roles</Menu.Item>
        <Menu.Item key="5">Log in</Menu.Item>
        <Menu.Item key="6">Register</Menu.Item> 
        <Menu.Item key="7"><Link to="/users">Users</Link></Menu.Item>
        <Menu.Item key="8">ctx.state.user.id route mby?</Menu.Item> 
      </Menu>
    </>
  );
}

export default Navbar;