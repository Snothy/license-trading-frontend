import React from 'react';
import { Layout } from 'antd';
import './App.css';

import Navbar from './components/navbar';
import Home from './components/home';
import Applications from './components/applications';
import Application from './components/application';
import Users from './components/users';
import User from './components/user';
import Login from './components/login';
import Chats from './components/chats';
import Chat from './components/chat';
import Roles from './components/roles';
import Role from './components/role';
import Register from './components/register'
import CreateApplication from './components/createApplication';
import CreateChat from './components/createChat';
import PendingChats from './components/pendingChats';
import UpdateUser from './components/updateUser';
import UserRoles from './components/userRoles';
import UpdateApplication from './components/updateApplication';
import CreateRole from './components/createRole';
import UpdateRole from './components/updateRole';

import UserContext from './contexts/user';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

const { Header, Content, Footer } = Layout;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                loggedIn: false,
                isStaff: false,
                isAdmin: false
            }
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(user) {
        console.log("User is now being set on the context");
        user.loggedIn = true; //useful in routes for showing conditional data | need the same for roles
        console.log(user.role_name);
        if(user.role_name === 'staff') {
            user.isStaff = true;
        } else if (user.role_name === 'administrator') {
            user.isStaff = true;
            user.isAdmin = true;
        }
        this.setState({user:user});
    }

    logout() {
        console.log("Removing user from the app context");
        this.setState({user: {loggedIn:false}});
        this.token = "";
    }

    render () {
        const context = {
        user: this.state.user,
        login: this.login,
        logout: this.logout
        };

        return (
        <UserContext.Provider value={context}>
            <Router>
                <Layout className="layout">
                
                <Header>
                    <Navbar />
                </Header>
                
                <Content>
                    <Switch>
                        <Route path="/users/:id/roles" children={<UserRoles />} />
                        <Route path="/users/:id/update" children={<UpdateUser />} />
                        <Route path="/roles/:id/update" children={<UpdateRole />} exact/>
                        <Route path="/applications/:id/update" children={<UpdateApplication />} exact />
                        <Route path="/roles/create" children={<CreateRole />} />
                        <Route path="/applications/create" children={<CreateApplication />} />
                        <Route path="/chats/pending" children={<PendingChats />} exact />
                        <Route path="/chats/create" children={<CreateChat />} />
                        <Route path="/applications/:id" children={<Application />} />
                        <Route path="/chats/:id" children={<Chat />} />
                        <Route path="/users/:id" children={<User />} />
                        <Route path="/roles/:id" children={<Role />} />
                        <Route path="/applications" children={<Applications />} />
                        <Route path="/register" children={<Register />} />
                        <Route path="/users" children={<Users />} />
                        <Route path="/login" children={<Login />} exact />
                        <Route path="/chats" children={<Chats />} exact />
                        <Route path="/roles" children={<Roles />} exact />
                        <Route path="/" children={<Home />} exact />
                    </Switch>
                </Content>

                <Footer style={{ textAlign: 'center' }}>License approval.</Footer>

                </Layout>
            </Router>
        </UserContext.Provider>  
        );
    }
}

export default App;