import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Col from 'react-bootstrap/Col';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { List, CardActions, Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FaUpload } from 'react-icons/fa';
import { RiDashboard3Fill, RiUploadCloudFill, RiMenuLine } from "react-icons/ri";
import "./Dashboard.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,

    },
    card: {
        maxHeight: 150,
        maxWidth: 250,
        display: 'flex',
    },
    media: {
        width:150,
        height: 100,
    },
    content: {
        flex: '1 0 auto',
      },
    details: {
        display: 'flex',
        flexDirection: 'column',
      },
}));

function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [emotionData, setEmotionData] = useState();
    useEffect(() => {
        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "path",
            'data/'+props.location.state.detail.slice(0,-4)+'/faces/',
        );
        console.log(formData)
        axios.post("http://127.0.0.1:5000/predict/emotions",formData).then(res => {
            const output = res.data;
            console.log(output)
            setEmotionData(output)
            console.log(emotionData)
        })
    }, []);
    return (


        <div className={classes.root}>
            <AppBar position="static" color="default" >
                <Tabs

                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"

                >
                    <Tab label={"Emotions of faces"} {...a11yProps(0)} />
                    <Tab label="Scenes" {...a11yProps(1)} />
                    <Tab label="Audio" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}


            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid container spacing={3} direction="row"
                        justify="flex-start"
                        alignItems="center">
                        {emotionData&&emotionData.output.map((data) => {
                            return <>
                                <Grid item xs={3}>
                                    <MediaCard data={data}/>
                                </Grid>
                            </>
                        })}


                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Image captioning
        </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                   Audio visualization
        </TabPanel>
            </SwipeableViews>
            {/* <div>
                <Col style={{ float: "center", width: "20%", paddingRight: "10rem", marginTop: "-13.4rem" }}>
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

            </div> */}
        </div>




    );
}
export function MediaCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>

            <CardMedia

                className={classes.media}
                image={"http://127.0.0.1:5000/"+props.data.file_path}
                title=""
            />
            <CardContent>
                <Typography gutterBottom variant="body" component="h6">
                    {props.data.file_path.slice(-17)}
            </Typography>
                <Typography variant="button" color="textSecondary" component="p">
                    Emotion: <b>{props.data.output}</b>
            </Typography>
            </CardContent>


        </Card>
    );
}

export default withRouter(FullWidthTabs)