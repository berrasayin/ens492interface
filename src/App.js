import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import config from './config';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {

    constructor(props) {
        super(props);

        firebase.initializeApp(config);

        this.state = {
            isSignedIn: false,
            userID: null,
            userData: {},
            token: null,
            authorizationLink: null,
        };
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.handleAuthState(!!user);
            this.handleUserID(user.uid);
            this.initiateUser(user);
            this.getUserData(user);
        });
    }
    handleAuthState = (state) => {
        this.setState({
            isSignedIn: state,
        });
    };

    handleUserID = (userID) => {
        this.setState({
            userID: userID,
        });
    };
    getUserData = (user) => {
        firebase
            .database()
            .ref("users")
            .child(user.uid)
            .once("value")
            .then((data) => {
                console.log("dataVAl", data.val());
                this.setState({
                    userData: data.val(),
                }
                );
            });
    };
    initiateUser = (user) => {
        let databaseRef = firebase.database().ref("users").child(user.uid);
        databaseRef
            .child("username")
            .once("value")
            .then((data) => {
                if (data.val()) {
                    console.log("There is some data:", data.val());
                } else {
                    databaseRef.update({
                        username: user.displayName,
                    });
                }
            });
    };

    signOut = async () => {
        firebase.auth().signOut();

      }

    render() {
        return (
            <div >
                <Router>
                    <MainPage
                        isSignedIn={this.state.isSignedIn}
                        signOut={() => this.signOut()}
                        username={this.state.userData ? this.state.userData.username : ""}
                    />
                </Router>
            </div>


        );
    }
}

export default App;
