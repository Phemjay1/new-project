import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from "@mdi/react";
import { mdiCheckboxMultipleMarkedCircleOutline } from "@mdi/js";

class QuizSummary extends Component {
    constructor (props){
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0,
        };
    }

    componentDidMount(){
        const { state } = this.props.location
    if(state){
        this.setState({
            score: (state.score / state.numberOfQuestions) * 100,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            hintsUsed: state.hintsUsed,
            fiftyFiftyUsed: state.fiftyFiftyUsed,
        });
    }
}
    render() {
        const { state, score } = this.props.location;
        let stats, remark;
        let userScore = this.state.score;

        if (userScore <= 30){
            remark = 'You need more practice!'
        } else if( userScore >30 && userScore<=50 ){
            remark = 'Better luck next time!'
        } else if (userScore  <= 70 &&userScore >50){
            remark = 'You can do better!'
        }else if (userScore >= 70 && userScore < 84){
            remark = 'You did great!'
         } else  {
             remark = 'You are absolutely genius!';
         }

        if(state !== undefined){
            stats = (
                <Fragment>
         <section className='body'>
            <div>
                <span className='success-icon'>
                    <Icon path={mdiCheckboxMultipleMarkedCircleOutline} size={8} />
                    </span>
            </div>
             <h1>Quiz has ended</h1>
            <div className='container stats'>
                <h4>{remark}</h4>
                <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                <span className='stat left'>Tota number of questions: </span>
                <span className='right'>{this.state.numberOfQuestions}</span>
                <br/>
                <span className='stat left'>Number of attempted questions: </span>
                <span className='right'>{this.state.numberOfAnsweredQuestions}</span>
                <br/>
                <span className='stat left'>Number of Correct Answers: </span>
                <span className='right'>{this.state.correctAnswers}</span>
                <br/>
                <span className='stat left'>Number of Wrong Answers: </span>
                <span className='right'>{this.state.wrongAnswers}</span>
                <br/>
                <span className='stat left'>Hints Used: </span>
                <span className='right'>{this.state.hintsUsed}</span>
                <br/>
                <span className='stat left'>50 - 50 Used: </span>
                <span className='right'>{this.state.fiftyFiftyUsed}</span>
            </div>
            <section>
                <div  className='btns'>
                <ul>
                    <li>
                        <Link to="/">Back to Home</Link>
                    </li>
                    <li>
                        <Link to="/play/quiz">Take test Again!</Link>
                    </li>
                    <li>
                        <Link to="/play/QuizSolution">Review Correction!</Link>
                    </li>
                </ul>
                </div> 
            </section>
        </section>
            </Fragment>
            )
        } else {
            stats = (
                <section>
            <h1 className='no-stats'>No Statistic Available</h1>
            <ul>
                    <li>
                        <Link to="/">Back to Home</Link>
                    </li>
                    <li>
                        <Link to="/play/quiz">Take a Test</Link>
                    </li>
                </ul>
                </section>)
        }
        return(
            <Fragment>
                <Helmet><title>Exam App - Summary</title></Helmet>
                <div className='quiz-summary'>
                    {stats}
                 </div>
            </Fragment>
        );
    }
};

export default QuizSummary;