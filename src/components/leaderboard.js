import React, { Component } from 'react';
import '../components/leaderboard.css';
import tick from '../images/tickg.png';
import one from '../images/1.png';
import two from '../images/2.png';
import ReactPlayer from 'react-player';



class leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      image1: one,
      image2: two,
      showMe1: false,
      showMe2: false,
    }
  }


  render() {
    return (
      <div className='background'>
        <div className="youtube">
          {
            this.state.showMe1 ?
              <div className="videone">
                <ReactPlayer url="https://www.youtube.com/embed/jIzgDxnDSpY"
                  onEnded={() => {
                    this.setState({
                      image1: tick
                    })
                  }}
                  width='550px'
                  height='250px' />
              </div> : null
          }
          {
            this.state.showMe2 ?
              <div className="videotwo">
                <ReactPlayer url="https://www.youtube.com/embed/wa9nEgVDJnE"
                  onEnded={() => {
                    this.setState({
                      image2: tick
                    })
                  }}
                  width='550px'
                  height='250px' />
              </div> : null
          }


        </div>
        <div className='buttons'>
          <img src={this.state.image2} className='inner2' onClick={() => this.setState({
            showMe2: !this.state.showMe2
          })}>
          </img>
          <img src={this.state.image1} onClick={() => this.setState({
            showMe1: !this.state.showMe1
          })} className='inner1'></img>
        </div>

      </div >
    );
  }
}

export default leaderboard;