/* eslint-disable react/prop-types */
import React from "react";

const Result = ({ score, totalQuestions, restartQuiz  }) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="result">
      <h2>Result</h2>
      <p>
        You scored {score} out of {totalQuestions} ({percentage.toFixed(2)}%)
      </p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Result;
