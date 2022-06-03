import React, { Component, Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import M from "materialize-css";
import Icon from "@mdi/react";
import { mdiSetCenter, mdiLightbulb, mdiClock } from "@mdi/js";
import questions from "../../questions.json";
import isEmpty from "../../utils/is-empty";
import correctNotification from "../../assets/audio/correct-audio.wav";
import wrongNotification from "../../assets/audio/wrong-audio.wav";
import buttonSound from "../../assets/audio/tap-audio.mp3";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuesion: 0,
      numberOfAnsweredQuesions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      previousRandomNumbers:[],
      time: {},
    };
    this.interval = null
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        numberOfQuesions: questions.length,
        previousRandomNumbers: [],
        answer,
      }, ()=>{this.showoptions()
      });
    }
  };

  handleOptionClick = (e) => {
    if (
      e.target.innerHTML.toLocaleLowerCase() ===
      this.state.answer.toLocaleLowerCase()
    ) {
      setTimeout(() => {
        document.getElementById("correct-sound").play();
      }, 500);
      this.correctAnswer();
    } else {
      setTimeout(() => {
        document.getElementById("wrong-sound").play();
      }, 500);
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1   
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push('/');
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  playButtonSound = () => {
    document.getElementById("button-sound").play();
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuesions: prevState.numberOfAnsweredQuesions + 1,
      }),
      () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuesions: prevState.numberOfAnsweredQuesions,
      }),
      () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
      }
    );
  };

showoptions = ()=> {
  const options = Array.from(document.querySelectorAll('.option'));
  options.forEach(option=>{
    option.style.visibility = 'visible';
  });
  this.setState({
    usedFiftyFifty: false
  });
}

handleHints=() => {
  if(this.state.hints>0){
    const options = Array.from(document.querySelectorAll('.option'));
    let indexOfAnswer;
  
    options.forEach((option, index) => {
      if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase())
      {
        indexOfAnswer= index;
      }
    });
  
    while (true){
      const randomNumber = Math.round(Math.random() * 3);
      if (randomNumber !== indexOfAnswer && !this.state
        .previousRandomNumbers.includes(randomNumber)   ){
        options.forEach((option, index) => {
          if (index === randomNumber){
            option.style.visibility = 'hidden';
            this.setState((prevState) => ({
              hints: prevState.hints - 1,
              previousRandomNumbers: prevState.previousRandomNumbers
              .concat(randomNumber )
            }));
          }
        });
        break;
      }
      if (this.state.previousRandomNumbers.length>=3) break;
    }
  }

}

handleFiftyFifty = ()=> {
  if(this.state.fiftyFifty>0 && this.state.usedFiftyFifty === false){
    const  options = document.querySelectorAll('.option');
    const randomNumbers = [];
    let indexOfAnswer;

    options.forEach((option, index)=> {
      if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
        indexOfAnswer =index;
      }
    });
    let count = 0;
    do{
      const randomNumber= Math.round(Math.random() * 3);
      if(randomNumber !== indexOfAnswer){
        if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
           randomNumbers.push(randomNumber);
           count ++;
        } else{
          while (true){
            const newRandomNumber= Math.round(Math.random() * 3);
            if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)){
              randomNumbers.push(newRandomNumber);
              count ++;
              break;
            }
          }
        }
      }
    } while (count < 2);
    options.forEach((option, index) => {
      if (randomNumbers.includes(index)){
        option.style.visibility = 'hidden';
      }
    });
    this.setState(prevState => ({
      fiftyFifty: prevState.fiftyFifty -1,
      usedFiftyFifty: true
    }) )
  }
}

startTimer = () => {
  const countDownTime = Date.now() + 12000;
  this.interval = setInterval(() => {
    const now = new Date();
    const distance = countDownTime - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60))/(1000*60));
    const seconds = Math.floor((distance % (1000 * 60))/1000);

    if (distance <  0){
      clearInterval(this.interval);
      this.setState({
        time: {
          minutes: 0,
          seconds: 0
        }
      }, () => {
        alert('Your Time has exceeded');
        this.props.history.push('/')
      });
    } else {
      this.setState({
        time: {
          minutes,
          seconds
        }
      })
    }
  }, 1000)
}

  render() {
    const { currentQuestion,
    currentQuestionIndex,
    fiftyFifty,
    hints,
    numberOfQuesions,
    time } =
      this.state;
    return (
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title>Exam Page</title>
          </Helmet>
        </HelmetProvider>
        <Fragment>
          <audio id="correct-sound" src={correctNotification}></audio>
          <audio id="wrong-sound" src={wrongNotification}></audio>
          <audio id="button-sound" src={buttonSound}></audio>
        </Fragment>
        <div className="questions">
          <h2>Exam mode</h2>
          <div className="lifeline-container">
            <p>
              <span onClick={this.handleFiftyFifty} className="mdi-mdi-set-center mdi-24px lifeline-icon">
                <Icon path={mdiSetCenter} size={0.8} />
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span onClick={this.handleHints}  className="mdi-mdi-set-center mdi-24px lifeline-icon">
                <Icon path={mdiLightbulb} size={0.8} />
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left" style={{ float: "left" }}>
                {currentQuestionIndex + 1} of {numberOfQuesions}
              </span>
              <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px">
                  <Icon path={mdiClock} size={0.8} />
                </span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button id="previous-button" onClick={this.handleButtonClick}>
              Previous
            </button>
            <button id="next-button" onClick={this.handleButtonClick}>
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Play;
