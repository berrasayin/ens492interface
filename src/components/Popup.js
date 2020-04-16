import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false,
            microNum: '',
        }
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClick}>
                    Click
      </Button>
                <Dialog open={this.state.open} onClose={this.handleClick} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">IF100</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            How many micro topics will you be watching?
          </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="micronum"
                            label="Mirco topics"
                            fullWidth
                            type="text"
                            value={this.state.microNum}
                            onChange={e => this.setInput(e)}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClick} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.setClick} color="primary">
                            Sumbit
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >

        );
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    };

    setClick = () => {
        localStorage.setItem('micronum', JSON.stringify(this.state.microNum)); //saving the microtopics to the local storage
        this.setState({
            open: !this.state.open,
            microNum: '' //clearing the input space
        })
        window.location.reload(false);

    }

    setInput = async (e) => {
        await this.setState({
            microNum: e.target.value
        })
    }
}

export default FormDialog;