import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import Profile from './profile';
import Contact from './contact';
import Courses from './courses';
import leaderboard from './leaderboard';




const Main = () => (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={Profile} /> 
        <Route path="/contact" component={Contact} />
        <Route path="/courses" component={Courses} />  
        <Route path="/leaderboard" component={leaderboard} /> 
    </Switch>
)

export default Main;