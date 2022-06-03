import React, { Fragment } from "react";
import Icon from "@mdi/react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { mdiLightbulbOn, mdiSetCenter } from "@mdi/js";
import { Link } from "react-router-dom";
import answer from "../../assets/img/answer.png";
import fiftyFifty from "../../assets/img/fiftyFifty.png";
import hints from "../../assets/img/hints.png";
import options from "../../assets/img/options.png";





const QuizInstructions = () => (
  <Fragment>
    <HelmetProvider> 
      <Helmet>
        <title>Exam Instructions - Exam App</title>
      </Helmet>
    </HelmetProvider>
    <div className="instructions container">
      <h1>How to attend to attend the Exam Questions</h1>
      <p>Ensure you read this quide from beginning to end before you start</p>
      <ul className="browser-default" id="main-list">
        <li>
          the guide has a duration of 20 minutes and ends as soon as time
          elapses.
        </li>
        <li>Each Subject consists of 20 questions</li>
        <li>
          Every question contains four options
          <img src={options} alt="Exam App options example" />
        </li>
        <li>
          select the option which best answer the question by clicking (or
          selecting) it.
          <img src={answer} alt="Exam App answer example" />
        </li>
        <li>
          Each question has two lifelines namely:
          <ul id="sublist">
            <li>two 50 - 50 chances</li>
            <li>five hints</li>
          </ul>
        </li>
        <li>
          Select a 50 - 50 lifeline by clicking the icon
          <span className="mdi-mdi-set-center mdi-24px lifeline-icon">
            <Icon path={mdiSetCenter} size={0.8} />
          </span>
          Will remove two wrong answers, leaving the correct answer and one
          wrong answer
          <img src={fiftyFifty} alt="Exam App fifty-Fifty example" />
        </li>
        <li>
          Using a hint by clicking the icon
          <span className="mdi-mdi-lightbulb-on mdi-24px lifeline-icon">
            <Icon path={mdiLightbulbOn} size={0.8} />
          </span>
          will remove one wrong answer leaving two wrong answers and one correct
          answer. You can use as many hints as possible ona single question.
          <img src={hints} alt="Exam App hints example" />
        </li>
        <li>
          Feel free to quit(or retire from) the exam at any convenient time. In
          that case your score will be received afterwards.
        </li>
        <li>The timer starts as soon as the questions loas.</li>
        <li>Let's do this if you think you've got what it takes?</li>
      </ul>

      <div>
        <span className="left">
          <Link to="/">No! Take me back</Link>
        </span>
        <span className="right">
          <Link to="/play/quiz">Okay! Start </Link>
        </span>
      </div>
    </div>
  </Fragment>
);

export default QuizInstructions;
