import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import "./HomePage.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@material-ui/core/Card';
import { List, CardActions, Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FaUpload } from 'react-icons/fa';
import { RiDashboard3Fill, RiUploadCloudFill, RiMenuLine } from "react-icons/ri";


function home(props) {
    return (
        <Container>
            <Row>
                <div class="TitleColor">
                    <Col style={{ marginLeft: "7rem" }}>
                        <h2>MULTIMEDIA SENTIMENT ANALYSIS</h2>
                    </Col>
                </div>

                <Card class="card_upload" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                    <h1> Upload video</h1>
                    <Row>
                        <Col>
                            <input type="file" style={{ paddingLeft: "5rem" }} /><br />
                        </Col>
                        <br />

                        <Col style={{ display: "flex", justifyContent: "center" }}>
                            <CardActions>
                                <Button

                                    variant="contained"
                                    color="primary"

                                >
                                    <RiUploadCloudFill style={{ padding: "0.25rem" }} />Upload
                                </Button>
                                <br />

                            </CardActions>
                        </Col>
                    </Row>
                </Card>
                <br />



                <div>
                    <Col style={{ float: "center", width: "20%", paddingRight: "10rem", marginTop: "-22.25rem" }}>
                        <Card class="card_list">
                            <List>
                                <ListItemIcon style={{ display: "flex", justifyContent: "left" }} >
                                    <RiMenuLine style={{ padding: "0.5rem" }} />
                                </ListItemIcon>
                                <hr />
                                <ListItem button onClick={() => { props.history.push("/HomePage") }}>
                                    <ListItemIcon>
                                        <FaUpload style={{ paddingRight: "1rem" }} />Upload Video
                                    </ListItemIcon>
                                </ListItem>
                                <br />

                                <ListItem button onClick={() => { props.history.push("/Dashboard") }}>
                                    <ListItemIcon >
                                        <RiDashboard3Fill style={{ paddingRight: "1rem" }} />Dashboard

                                    </ListItemIcon>
                                </ListItem>
                                <br />
                            </List>
                        </Card>
                    </Col>

                </div>
            </Row>


        </Container>







    );
}



export default home;
