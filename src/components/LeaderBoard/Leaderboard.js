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
            overallScore: [],
            students: {},
            ascending: true,
            sortedStudents: {}
        };
    }


    componentDidMount = async () => {
        firebase.database().ref("users").once("value").then(data => {
            let users = data.val()
            for (let key in users) {
                let student = users[key];
                this.state.students[student["username"]] = student["overallScore"];
            }
            this.ascendingDescending();
            for (var key in this.state.students) {
                this.setState({
                    name: [...this.state.name, key],
                    overallScore: [...this.state.overallScore, this.state.students[key]]
                })
            }
        });
    }

    ascendingDescending = () => {
        let dicti = this.state.students
        var items = Object.keys(dicti).map(function (key) {
            return [key, dicti[key]];
        });
        if (!this.state.ascending) {
            items.sort(function (first, second) { //ascending order
                return second[1] - first[1];
            });
        } else {
            items.sort(function (first, second) { //descending order
                return first[1] - second[1];
            });
        }
        for (var i = 0; i < items.length; i++) {
            let studentName = items[i][0];
            let studentScore = items[i][1];
            this.state.sortedStudents[studentName] = studentScore;
        }
        this.setState({
            ascending: !this.state.ascending,
            students: this.state.sortedStudents,
            sortedStudents: {},
        })
        console.log(this.state.students)
    }


    render() {

        return (
            <TableContainer component={Paper} >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name & Surname</StyledTableCell>
                            <StyledTableCell align='left' >Score</StyledTableCell>
                            <img onClick={this.ascendingDescending} className="sorting" src={this.state.ascending ? up : down} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(this.state.students).map((label, index) => (
                            <StyledTableRow >
                                <StyledTableCell >
                                    {label}
                                </StyledTableCell>
                                <StyledTableCell align="left">{this.state.students[label]}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default Leaderboard;