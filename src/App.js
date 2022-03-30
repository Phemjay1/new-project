import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import QuizInstructions from "./components/quiz/QuizInstructions"; 
import Play from "./components/quiz/Play";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/play/instructions" element={<QuizInstructions/>} />
        <Route exact path="/play/Quiz" element={<Play/>} />
      </Routes>
    </Router>
  );
}

export default App;
