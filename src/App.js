import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainP/MainPage';
import config from './config';
import firebase from 'firebase';
import LoginRegister from './components/LoginRegister/LoginRegister';
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
            username: '',
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
        console.log(this.state.userID)

    };
    getUserData = async (user) => {
        let dataThere = false
        await firebase
            .database()
            .ref("users")
            .child(user.uid)
            .once("value")
            .then((data) => {
                console.log("dataVAl", data.val());
                if (data.val() === null) {
                    dataThere = true
                }
                this.setState({
                    userData: data.val(),
                }
                );
            });
        if (dataThere) {
            console.log(this.state.username)
            firebase
                .database()
                .ref("users")
                .child(user.uid)
                .update({
                    email: user.email,
                    overallScore: 0,
                    username: this.state.username,
                })
        }
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
        await this.setState({
            isSignedIn: false,
        })
    }

    updateName = (userName) => {
        this.setState({
            username: userName
        })
    }

    render() {
        return (
            <div >
                {this.state.isSignedIn ? <MainPage
                    isSignedIn={this.state.isSignedIn}
                    signOut={() => this.signOut}
                    username={this.state.userData ? this.state.userData.username : ""}
                    userID={this.state.userID ? this.state.userID : ""}
                /> : <LoginRegister updateName={this.updateName} />}

            </div>


        );
    }
}

export default App;
