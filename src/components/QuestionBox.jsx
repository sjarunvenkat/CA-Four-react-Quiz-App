/* eslint-disable react/display-name */
import React, { useState, useEffect, memo } from "react";

const QuestionBox = memo(
  ({
    question,
    currentQuestion,
    totalQuestions,
    handleAnswer,
    isHighlighted,
    setIsHighlighted,
  }) => {
    const { text, options } = question;
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
      setSelectedOption(null);
    }, [question]);

    const handleOptionClick = (optionIndex) => {
      setSelectedOption(optionIndex);
    };

    useEffect(() => {
      if (selectedOption !== null) {
        const correctOptionIndex = options.findIndex(
          (option) => option.isCorrect
        );
        const isCorrect = selectedOption === correctOptionIndex;
        const timer = setTimeout(() => {
          handleAnswer(isCorrect);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }, [selectedOption, options, handleAnswer]);

    const isLastQuestion = currentQuestion === totalQuestions - 1;

    return (
      <div className="question-box">
        <div className="question-info">
          <span>
            Question: {currentQuestion + 1} out of {totalQuestions}
          </span>
        </div>
        <div className={`question-text ${isHighlighted ? "highlighted" : ""}`}>
          {text}
        </div>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="highlight-buttons">
          <button onClick={() => setIsHighlighted(true)}>Highlight</button>
          <button onClick={() => setIsHighlighted(false)}>
            Remove Highlight
          </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom equality check for memoization
    return (
      prevProps.question === nextProps.question &&
      prevProps.currentQuestion === nextProps.currentQuestion &&
      prevProps.totalQuestions === nextProps.totalQuestions &&
      prevProps.isHighlighted === nextProps.isHighlighted
    );
  }
);

export default QuestionBox;
