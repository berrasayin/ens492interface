import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import config from '../../config';
import './micro.css';
import firebase from 'firebase';
import DialogMicro from '../DialogMicro';
import TextField from '@material-ui/core/TextField';



class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: [],
      videos: [],
      try: [],
      modalShow: true,
      answerKey: [],
      questions: [],
      answer: '',
      canPass: false,
      score: 0,
      counter: 0,//must be equal to the number of questions in quiz to be able to skip to the next microtopic
      overallScore: 0,
    };
  }

  componentDidMount = async () => {
    firebase.database().ref("microTopics").child("courses").once("value").then(data => {
      let videosDict = data.val()
      for (let key in videosDict) {
        this.setState({
          videos: [...this.state.videos, videosDict[key]],
          steps: [...this.state.steps, key]
        })
      }
    });
    firebase.database().ref("microTopics").child("quizs").once("value").then(data => {
      let quizes = data.val()
      for (let key in quizes) {
        let quiz = quizes[key]
        for (let ques in quiz) {
          let quizzes = quiz[ques]
          this.setState({
            answerKey: [...this.state.answerKey, quizzes["answer"]],
            questions: [...this.state.questions, quizzes["question"]]
          })
        }
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
      )
    );
    this.setState({//makes the next/finished button disabled all the time 
      canPass: false,
      score: 0,
      counter: 0,
    })
  }


  handleBack = async () => {
    await this.setState(
      prevState => ({ activeStep: prevState.activeStep - 1 }
      ));
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      answer: '',
      score: 0,
    })
  };


  saveAnswer = async (event) => { //made it async in order to wait for the event to come 
    localStorage.setItem('answer', this.state.answer);
    if (this.state.answer === this.state.answerKey[0]) {  //Checking whether the answer is true in the question
      await this.setState({
        answerKey: this.state.answerKey.slice(1),
        score: this.state.score + 1,
        answer: '',
        counter: this.state.counter + 1,
      })
      console.log("tru", this.state.answer, this.state.score)
      if (this.state.score > 1) {
        this.setState({
          canPass: true,
          overallScore: this.state.overallScore + this.state.score,
          answerKey: this.state.answerKey.slice(3 - this.state.counter, this.state.answerKey.length)
        })
        console.log(this.state.answerKey)
      }
    } else if (this.state.answer === " " || this.state.answer === "") { // if user entered an empty input or nothing at all 
      alert("You entered an empty answer. Please choose one of the options!");
      await this.setState({
        answer: '',
      })
    } else { //if answer is not true
      console.log("flase", this.state.answer, this.state.score)
      await this.setState({
        answer: '',
      });
      if (this.state.score > 1) {
        this.setState({
          canPass: true,
          overallScore: this.state.overallScore + this.state.score,
          answerKey: this.state.answerKey.slice(3 - this.state.counter, this.state.answerKey.length)
        })
      }
      console.log(this.state.answerKey)
    }
  }

  handleScore = () => {
    firebase.database().ref("users").child(this.props.userID).update({
      overallScore: this.state.overallScore,
    });
  }


  setInput = async (e) => {
    e.preventDefault();
    await this.setState({
      answer: e.target.value
    })
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
                      {/* <Button
                      disabled={this.state.activeStep === 0 ? true : false}
                        onClick={this.handleBack}
                        className='click'
                      >
                        Back
                    </Button> */}
                      {this.state.questions.slice(index * 3, (index * 3) + 3).map((label, ind) => (
                        <div className="quiz-ans">
                          <img src={label} />
                          <TextField

                            id={ind * 3}
                            autoFocus
                            label="Answer:"
                            type="text"
                            onChange={e => this.setInput(e)}
                            placeholder="Enter A, B and so on"
                          />
                          <Button onClick={this.saveAnswer}>Save your answer</Button>
                        </div>
                      ))}

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className='click'
                        disabled={!this.state.canPass}
                      >
                        {this.state.activeStep === JSON.parse(localStorage.getItem('micronum')) - 1 ? 'Finish' : 'Next'}
                      </Button>
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
            <Button onClick={this.handleScore} className='click'>
              Save Your Score To The Board
             </ Button>
          </Paper>
        )}
      </div >
    );
  }
}
export default Courses;                                                                                                                                                         