import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import student from '../images/studentimg.png';

class Landing extends Component {
    render() {
        return (
            <div style={{ width: '100%', margin: 'auto' }}>
                <Grid className="landing-grid">
                    <Cell col={12}>
                        <img
                            src={student}
                            alt="avatar"
                            className="avatar-img"
                        />

                        <div className="banner-text">
                            <h1>Freshman Student</h1>
                            <hr />
                            <div className="social-links">

                                {/*Linkedin*/}
                                <a href="http://linkedin.com" rel="noopener noreferrer" target="_blank">
                                    <i className="fa fa-linkedin-square" aria-hidden="true" />
                                </a>

                                {/*Github*/}
                                <a href="http://github.com" rel="noopener noreferrer" target="_blank">
                                    <i className="fa fa-github-square" aria-hidden="true" />
                                </a>

                                {/*Freecodecamp*/}
                                <a href="https://freecodecamp.org/" rel="noopener noreferrer" target="_blank">
                                    <i className="fa fa-free-code-camp" aria-hidden="true" />
                                </a>

                                {/*Youtube*/}
                                <a href="https://youtube.com/watch?v=rfscVS0vtbw" rel="noopener noreferrer" target="_blank">
                                    <i className="fa fa-youtube-square" aria-hidden="true" />
                                </a>

                            </div>

                        </div>
                    </Cell>
                </Grid>
            </div>

        );
    }
}

export default Landing;