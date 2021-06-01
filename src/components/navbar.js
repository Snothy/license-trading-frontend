import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import {useContext} from 'react';
import UserContext from '../contexts/user';

function Navbar(props) {
    const context = useContext(UserContext);
    const loggedIn = context.user.loggedIn;
    let Nav
    if (!loggedIn) {
        Nav = (
            <>
            <Menu.Item key="5">
                <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="7">Register</Menu.Item> 
            </>
        )
    } else {
        Nav = (
            <>
            <Menu.Item key="8"><Link to="/users">Users</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/applications">Applications</Link></Menu.Item>
            <Menu.Item key="3">Chat</Menu.Item>
            <Menu.Item key="4">Roles</Menu.Item>
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
            {Nav}
        </Menu>
        </>
    );
}

export default Navbar;