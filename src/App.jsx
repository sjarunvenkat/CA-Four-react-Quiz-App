import React, { useCallback, useReducer } from "react";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import questions from "./questions";
import "./App.css";

const initialState = {
  currentQuestion: 0,
  score: 0,
  isDarkMode: false,
  isHighlighted: false,
  showResult: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        isHighlighted: false,
      };
    case "UPDATE_SCORE":
      return { ...state, score: state.score + 1 };
    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkMode: !state.isDarkMode };
    case "HIGHLIGHT_QUESTION":
      return { ...state, isHighlighted: true };
    case "REMOVE_HIGHLIGHT":
      return { ...state, isHighlighted: false };
    case "SHOW_RESULT":
      return { ...state, showResult: true };
    case "RESTART_QUIZ":
      return initialState;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAnswer = useCallback(
    (isCorrect) => {
      if (isCorrect) {
        dispatch({ type: "UPDATE_SCORE" });
      }
      const nextQuestion = state.currentQuestion + 1;
      if (nextQuestion < questions.length) {
        dispatch({ type: "NEXT_QUESTION" });
      } else {
        dispatch({ type: "SHOW_RESULT" });
      }
    },
    [state.currentQuestion]
  );

  const toggleDarkMode = useCallback(() => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  }, []);

  const restartQuiz = useCallback(() => {
    dispatch({ type: "RESTART_QUIZ" });
  }, []);

  return (
    <div className={`app ${state.isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="heading">
        <h1>Kalvium</h1>
        <button onClick={toggleDarkMode}>
          {state.isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      {state.showResult ? (
        <Result
          score={state.score}
          totalQuestions={questions.length}
          restartQuiz={restartQuiz}
        />
      ) : (
        <QuestionBox
          question={questions[state.currentQuestion]}
          currentQuestion={state.currentQuestion}
          totalQuestions={questions.length}
          handleAnswer={handleAnswer}
          isHighlighted={state.isHighlighted}
          setIsHighlighted={(value) =>
            dispatch({
              type: value ? "HIGHLIGHT_QUESTION" : "REMOVE_HIGHLIGHT",
            })
          }
        />
      )}
    </div>
  );
}

export default App;