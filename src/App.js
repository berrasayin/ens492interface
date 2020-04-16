import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <div className="demo-big-content">
    <Layout>
        <Header className="header-color" title="Sabancı University E-Learning Platform" scroll>
            <Navigation>
                <Link to="/profile">Profile</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/leaderboard">Leader Board</Link>
                <Link to="/contact">Contact</Link>
            </Navigation>
        </Header>
        <Drawer title="Title">
            <Navigation>
                <Link to="/profile">Profile</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/leaderboard">Leader Board</Link>
                <Link to="/contact">Contact</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main />
        </Content>
    </Layout>
</div>
      

    );
  }
}

export default App;
