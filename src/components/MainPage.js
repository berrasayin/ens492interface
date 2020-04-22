import React, { Component } from 'react';
//import logo from './logo.svg';
import './mainPage.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { Link, Switch, Route } from 'react-router-dom';
import LandingPage from './Landingpage';
import Profile from './Profile';
import Contact from './Contact/Contact';
import Courses from './Courses';
import ProfileAuth from './Auth/ProfileAuth';

class App extends Component {
    render() {
        return (
            <div className="demo-big-content">
                <Layout>
                    <Header className="header-color">
                        <Navigation>
                            <Link to=''>Sabancı University E-Learning Platform</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/courses">IF100</Link>
                            <Link to="/contact">Contact</Link>
                            <ProfileAuth
                                signOut={() => this.props.signOut()}
                                isSignedIn={this.props.isSignedIn}
                                username={this.props.username}
                            />
                        </Navigation>
                    </Header>

                    <Content>
                        <div className="page-content" />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={() => <LandingPage username={this.props.username} />} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/courses" component={Courses} />
                        </Switch>
                    </Content>
                </Layout>
            </div>


        );
    }
}

export default App;