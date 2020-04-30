import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import config from '../config';
import './micro.css';
import firebase from 'firebase';
import DialogMicro from './DialogMicro';



class Courses extends React.Component {

  constructor() {
    super();
    this.state = {
      activeStep: 0,
      steps: [],
      videos: [],
      try: [],
      modalShow: true,
      answerKey: [],
      questions: [],
      answer: '',
    };
  }

  componentDidMount = async () => {

    firebase.database().ref("microTopics").child("courses").once("value").then(data => {
      let videosDict = data.val()
      for (let key in videosDict) {
        //console.log( videosDict[key])
        this.setState({
          videos: [...this.state.videos, videosDict[key]],
          steps: [...this.state.steps, key]
        })
      }
    });
    firebase.database().ref("microTopics").child("quizs").once("value").then(data => {
      let quizes = data.val()
      console.log(quizes)
      for (let key in quizes) {
        let quiz = quizes[key]
        this.setState({
          answerKey: [...this.state.answerKey, quiz["answer"]],
          questions: [...this.state.questions, quiz["question"]]
        })
      }
    });
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

  setModalShow = (state) => {
    this.setState({
      modalShow: state,
    });
  };


  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ReactPlayer
          className='react-player'
          url={this.state.videos[0]}
          width='700px'
          height='500px'
          controls={true} />
      case 1:
        return <ReactPlayer
          className='react-player'
          url={this.state.videos[1]}
          width='700px'
          height='500px'
          controls={true} />
      case 2:
        return <ReactPlayer
          className='react-player'
          url={this.state.videos[2]}
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

  saveAnswer = (event) => {
    localStorage.setItem('answer', this.state.answer);
    console.log(this.state.answer);
    event.target.value = '';
  }
  handleAnswer = (event) => {
    this.setState({
      answer: [...this.state.answer, event.target.value],
    });
  }

  render() {

    return (
      <div className='main' >
        <DialogMicro
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)} />
        <Stepper className='micro-topics' activeStep={this.state.activeStep} orientation="vertical">
          {localStorage !== null &&
            this.state.steps.slice(0, JSON.parse(localStorage.getItem('micronum'))).map((label, index) => (
              < Step key={label} >
                <StepLabel >{label}</StepLabel>
                <StepContent>
                  <Typography >{this.getStepContent(index)}</Typography>
                  <div className='actionsContainer'>
                    <div>
                      <img src={this.state.questions[index]} />
                      {/* <Button
                        disabled={this.state.activeStep === 0 ? true : false}
                        onClick={this.handleBack}
                        className='click'
                      >
                        Back
                    </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className='click'
                      >
                        {this.state.activeStep === JSON.parse(localStorage.getItem('micronum')) - 1 ? 'Finish' : 'Next'}
                      </Button>
                      <form>
                        <label>
                          Answer:
                          <input type="text" name="name" placeholder="Enter A, B and so on" onChange={this.handleAnswer} />
                          <Button onClick={this.saveAnswer}>Save your answer</Button>
                        </label>
                      </form>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
        </Stepper>
        {this.state.activeStep === this.state.steps.slice(0, JSON.parse(localStorage.getItem('micronum'))).length && (
          <Paper square elevation={0} className='resetContainer'>
            <Typography>All micro topics are completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className='click'>
              Reset
            </Button>
          </Paper>
        )}
      </div >
    );
  }
}
export default Courses;