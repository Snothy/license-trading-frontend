import { Layout } from 'antd';
import './App.css';

import Navbar from './components/navbar';
import Home from './components/home';
import Applications from './components/applications';
import Application from './components/application';
import Users from './components/users';
import User from './components/user';


import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


const { Header, Content, Footer } = Layout;

function App() {
  return (
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
                <Route path="/users" children={<Users />} />
                <Route path="/" children={<Home />} exact />
            </Switch>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Absolute gamer moment.</Footer>

        </Layout>
    </Router>
  );
}

export default App;