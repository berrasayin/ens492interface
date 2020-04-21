import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent } from 'react-mdl';
import './contact.css';

class Contact extends Component {
    render() {
        return (
            <div className="contact-body">
                <Grid className="contact-grid">
                    <Cell col={6}>
                        <h2>Sabancı University</h2>
                        <img
                            src="https://www.sabanciuniv.edu/sites/default/themes/su/assets/img/footer-logo.png"
                            alt="avatar"
                            style={{ height: '120px', width: '55%' }}
                        />
                        <p style={{ width: '75%', margin: 'auto', paddingTop: 'lem' }}>Computer Science and Engineering (CSE)
                        Program addresses leading edge science and technology both with its wide curriculum and research
                        expertise. In parallel with the philosophy of Sabancı University, our target is the production and
                        dissemination of knowledge through local and international, academic and industrial, and possibly
                        inter-disciplinary, R&D projects. Whether you want to collabrate with us in enthusiastic projects or
                        you want to become a CSE student, our most valuable assets, please take a tour on our site to get to
                        know us better.</p>
                    </Cell>
                    <Cell col={6}>
                        <h2>Contact </h2>
                        <hr />
                        <div className="contact-list">
                            <List>
                                <ListItem>
                                    <ListItemContent style={{ fontSize: '20px', fontFamily: 'Anton' }}>
                                        <i className="fa fa-home" aria-hidden="true" />
                                        Sabancı Üniversitesi,
                                        Orta Mahalle, Üniversite Caddesi, No: 27
                                        Tuzla, 34956 Istanbul
                                    </ListItemContent>
                                </ListItem>

                                <ListItem>
                                    <ListItemContent style={{ fontSize: '20px', fontFamily: 'Anton' }}>
                                        <i className="fa fa-phone-square" aria-hidden="true" />
                                        +90 216 483 92 14
                                    </ListItemContent>
                                </ListItem>

                                <ListItem>
                                    <ListItemContent style={{ fontSize: '20px', fontFamily: 'Anton' }}>
                                        <i className="fa fa-fax" aria-hidden="true" />
                                        +90 216 483 92 25
                                    </ListItemContent>
                                </ListItem>

                                <ListItem>
                                    <ListItemContent style={{ fontSize: '20px', fontFamily: 'Anton' }}>
                                        <i className="fa fa-envelope" aria-hidden="true" />
                                        bm@sabanciuniv.edu
                                    </ListItemContent>
                                </ListItem>




                            </List>
                        </div>
                    </Cell>
                </Grid>
            </div>

        );
    }
}

export default Contact;