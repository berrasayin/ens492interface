import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { Avatar, Tooltip, Menu, MenuItem } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'

class ProfileAuth extends React.Component {



    state = {
        render: false,
        anchorEl: null,
        setAnchorEl: null,
        isMenuOpened: false,
    };


    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: "popup",
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: "/",
        // We will display Google and Facebook as auth providers.
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    handleClose = () => {
        this.setState({ isMenuOpened: false });
    }

    render() {

        const { classes } = this.props;

        if (this.props.isSignedIn && this.props.username && this.props.username !== undefined) {
            return (
                <div>
                    <Tooltip aria-controls="simple-menu" aria-haspopup="true" title={this.props.isSignedIn ? this.props.username : ''}
                        onClick={(_) =>
                            this.setState({
                                isMenuOpened: true,
                                anchorEl: _.currentTarget
                            })
                        }>
                        <Avatar alt={this.props.username} src="/broken-image.jpg" className={classes.purple} />
                    </Tooltip>
                    <Menu
                        id="simple-menu"
                        keepMounted
                        anchorEl={this.state.anchorEl}

                        open={this.state.isMenuOpened}
                        onClose={() => this.handleClose()}
                    >
                        <MenuItem onClick={() => this.props.signOut().then(() => this.handleClose())}>Logout</MenuItem>
                    </Menu>
                </div>
            );
        } else {
            return (
                <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            );
        }
    }
    // }
}

export default withStyles(styles)(ProfileAuth);
