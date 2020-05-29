import React, { Component } from 'react';
import config from '../../config';
import './loginRegister.css';
import login from '../../images/login.png';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from 'firebase';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

class LoginRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            nameSurname: '',
            fireErrors: '',
            formTitle: 'Login',
            loginBtn: true,
            student: 'Student',
            choosen: false,
            open: true,
        }
        this.register = this.register.bind(this);
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    studentLogin = () => {
        this.setState({
            choosen: true,
            open: false,
        })
    }

    login = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error => {
            this.setState({
                fireErrors: error.message,
                nameSurname: e.target.nameSurname.value,
            });
        }))
    }

    register = e => {

        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error => {
            this.setState({
                fireErrors: error.message,
                nameSurname: e.target.nameSurname.value,
            });

        }))
        this.props.updateName(this.state.nameSurname);
    }


    getAction = action => {
        if (action === "reg") {
            this.setState({
                formTitle: 'Register New User',
                loginBtn: false,
                fireErrors: '',
            })
        } else {
            this.setState({
                formTitle: 'Login',
                loginBtn: true,
                fireErrors: '',
            })
        }
    }


    render() {

        let errorNotification = this.state.fireErrors ?
            (<div className="Error">{this.state.fireErrors}</div>) : null;

        let submitBtn = this.state.loginBtn ?
            (<button className="loginBtn" type="submit" onClick={this.login}>LOGIN</button>) :
            (<button className="loginBtn" type="submit" onClick={this.register}>REGISTER</button>);

        let login_register = this.state.loginBtn ?
            (<button className="registerBtn" type="submit" onClick={() => this.getAction('reg')} >REGISTER</button>) :
            (<button className="registerBtn" type="submit" onClick={() => this.getAction('login')} >LOGIN</button>);
        return (
            <div className="form_block">
                <div id="title">
                    {this.state.formTitle}
                </div>
                <div className="body">
                    <img className="loginImage" src={login} />
                    {errorNotification}
                    <form>
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Enter your e-mail"
                            name="email" />
                        <input
                            type="text"
                            value={this.state.nameSurname}
                            onChange={this.handleChange}
                            placeholder="Enter your Name&Surname"
                            name="nameSurname" />
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Enter your password"
                            name="password" />
                        <PopupState isOpen={this.state.open} variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                                        {this.state.choosen ? this.state.student : "Login as..."}
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={this.studentLogin}>Student</MenuItem>
                                        <MenuItem>Instructor</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                        <br />
                        <br />
                        {submitBtn}
                    </form>
                    {login_register}

                </div>

            </div>
        );
    }
}
export default LoginRegister;