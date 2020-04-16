import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './Landingpage';
import Profile from './Profile';
import Contact from './Contact';
import Courses from './Courses';





const Main = () => (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/contact" component={Contact} />
        <Route path="/courses" component={Courses} />
    </Switch>
)

export default Main;