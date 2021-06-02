import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import {useContext} from 'react';
import UserContext from '../contexts/user';

function Navbar(props) {
    const context = useContext(UserContext);
    const loggedIn = context.user.loggedIn;
    const isStaff = context.user.isStaff;
    const isAdmin = context.user.isAdmin;
    let Nav;
    let staffNav;
    let adminNav;
    if (isStaff) {
        staffNav = (
            <>
                <Menu.Item key="8"><Link to="/users">Users</Link></Menu.Item>
            </>
        )
    }
    if (isAdmin) {
        adminNav = (
            <>
                <Menu.Item key="4"><Link to="/roles">Roles</Link></Menu.Item>
            </>
        )
    }
    if (!loggedIn) {
        Nav = (
            <>
            <Menu.Item key="5">
                <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="7">
                <Link to="/register">Register</Link>
            </Menu.Item> 
            </>
        )
    } else {
        Nav = (
            <>
            <Menu.Item key="2"><Link to="/applications">Applications</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/chats">Chat</Link></Menu.Item>
            <Menu.Item key="6" onClick={context.logout}><Link to="/">Logout</Link></Menu.Item>
            <Menu.Item key="9"><Link to = {`users/${context.user.ID}`}>Profile</Link></Menu.Item> 
            </>
        )
    }
    return (
        <>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            {staffNav}
            {adminNav}
            {Nav}
        </Menu>
        </>
    );
}

export default Navbar;