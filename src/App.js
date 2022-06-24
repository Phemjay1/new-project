import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import ExamCategories from "./components/quiz/ExamCategories";
import Home from "./components/Home";
import QuizInstructions from "./components/quiz/QuizInstructions"; 
import Play from "./components/quiz/Play";
import QuizSummary from "./components/quiz/QuizSummary";
import QuizSolution from "./components/quiz/QuizSolution";

function App() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/play/instructions" exact component={QuizInstructions} />
        <Route path="/play/Quiz" exact component={Play} />
        <Route path="/play/quizSummary" exact component={QuizSummary} />
        <Route path="/play/quizSolution" exact component={QuizSolution} />
        <Route path="/play/examCategories" exact component={ExamCategories} />
    </Router>
  );
}

export default App;
