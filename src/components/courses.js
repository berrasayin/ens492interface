import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import Popup from './Popup.js';
import config from '../config';
import './micro.css';
import firebase from 'firebase';



class Courses extends React.Component {

    constructor() {
      super();
  

  
      this.state = {
        activeStep: 0,
        steps: [],
        videos: [],
        try: []
      };
    }
  
    componentDidMount = async () => {
  
      this.handleData();
      // await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then((result) => {
      //   this.setState({
      //     try: result
      //   })
      //   console.log(this.state.try)
      // })
  
  
      // await fetch('https://jsonplaceholder.typicode.com/users', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     id: 11,
      //     name: 'Jane Doe',
      //     username: 'janedoe',
      //     email: 'janedoe@biz',
      //   }),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8"
      //   }
      // }).then(response => response.json())
      //   .then(json => console.log(json))
  
    }
  
      // FOR FIREBASE
  handleData = () => {
      firebase.database().ref("microTopics").once("value").then(data => {
        let videosDict = data.val()
        for (let key in videosDict) {
          this.setState({
            videos: [...this.state.videos, videosDict[key]],
            steps: [...this.state.steps, key]
          })
        }
      });
      console.log(this.state.videos);
    }
  
  
    getStepContent = (step) => {
      switch (step) {
        case 0:
          return <ReactPlayer
            className='react-player'
            url={this.state.videos[1]}
            width='700px'
            height='500px'
            controls={true} />
        case 1:
          return <ReactPlayer
            className='react-player'
            url={this.state.videos[2]}
            width='700px'
            height='500px'
            controls={true} />
        case 2:
          return <ReactPlayer
            className='react-player'
            url={this.state.videos[3]}
            width='700px'
            height='500px'
            controls={true} />
        default:
          return 'Unknown step';
      }
    }
  
  
    handleNext = async () => {
      await this.setState(
        prevState => ({ activeStep: prevState.activeStep + 1 }
        ));
    }
  
    handleBack = async () => {
      await this.setState(
        prevState => ({ activeStep: prevState.activeStep - 1 }
        ));
    }
  
    handleReset = () => {
      this.setState({
        activeStep: 0
      })
    };
  
  
    render() {
  
      return (
        <div className='main' >
          <Popup />
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {localStorage !== null &&
              this.state.steps.slice(0, JSON.parse(localStorage.getItem('micronum'))).map((label, index) => (
                < Step key={label} >
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{this.getStepContent(index)}</Typography>
                    <div className='actionsContainer'>
                      <div>
                        <Button
                          disabled={this.state.activeStep === 0 ? true : false}
                          onClick={this.handleBack}
                          className='click'
                        >
                          Back
                    </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className='click'
                        >
                          {this.state.activeStep === JSON.parse(localStorage.getItem('micronum')) - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
          </Stepper>
          {this.state.activeStep === this.state.steps.length && (
            <Paper square elevation={0} className='resetContainer'>
              <Typography>All micro topics are completed - you&apos;re finished</Typography>
              <Button onClick={this.handleReset} className='click'>
                Reset
            </Button>
            </Paper>
          )}
          <div>//</div>
        </div >
      );
    }
  }
  export default Courses;