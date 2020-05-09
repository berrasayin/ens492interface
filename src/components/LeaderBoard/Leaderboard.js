import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './leaderboard.css';
import firebase from 'firebase';
import down from '../../images/down.png'
import up from '../../images/up.png'
import { borderLeft } from '@material-ui/system';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.secondary,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);




class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: [],
            score: [],
            students: {},
            ascending: true,
        };
    }


    componentDidMount = async () => {
        firebase.database().ref("users").once("value").then(data => {
            let users = data.val()
            for (let key in users) {
                let student = users[key];
                this.setState({
                    name: [...this.state.name, student["username"]],
                    score: [...this.state.score, student["score"]],
                })
                this.state.students[student["username"]] = student["score"];

            }
            console.log(this.state.students)
        });
    }

    render() {

        return (
            <TableContainer component={Paper} >
                <Table className="table" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name & Surname</StyledTableCell>
                            <img className="sorting" src={this.state.ascending ? up : down} />
                            <StyledTableCell align="left">Score</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.name.map((label, index) => (
                            <StyledTableRow className="row" key={label}>
                                <StyledTableCell >
                                    {index + 1 + ". " + this.state.name[index]}
                                </StyledTableCell>
                                <StyledTableCell align="left">{this.state.score[index]}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default Leaderboard;