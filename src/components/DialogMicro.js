import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";

class DialogMicro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      microNum: '',
    }
  }

  closeThePopup = async () => {
    localStorage.setItem('micronum', JSON.stringify(this.state.microNum)); //saving the microtopics to the local storage
    this.props.onHide();
  }
  setInput = async (e) => {
    await this.setState({
      microNum: e.target.value
    })
  }

  render() {
    return (
      <Dialog
        open={this.props.show}
        onClose={this.props.onHide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-dialog-title">Welcome to the IF100 course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the number of microtopics you will be studying.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Microtopics number"
            fullWidth
            value={this.state.microNum}
            onChange={e => this.setInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onHide} color="primary">
            Cancel
          </Button>
          <Button onClick={this.closeThePopup} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    );

  };

}
export default DialogMicro;
