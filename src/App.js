import React, { useContext } from 'react';
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
        user: {loggedIn: false}
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(user) {
        console.log("User is now being set on the context");
        user.loggedIn = true; //useful in routes for showing conditional data | need the same for roles
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
                        <Route path="/applications/:id" children={<Application />} />
                        <Route path="/applications" children={<Applications />} />
                        <Route path="/users/:id" children={<User />} />
                        <Route path="/chats/:id" children={<Chat />} />
                        <Route path="/roles/:id" children={<Role />} />
                        <Route path="/users" children={<Users />} />
                        <Route path="/login" children={<Login />} exact />
                        <Route path="/chats" children={<Chats />} exact />
                        <Route path="/roles" children={<Roles />} exact />
                        <Route path="/" children={<Home />} exact />
                    </Switch>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Absolute gamer moment.</Footer>

                </Layout>
            </Router>
        </UserContext.Provider>  
        );
    }
}

export default App;