import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import { FaRegClock } from "react-icons/fa";

const QuizAttempt = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get(`${server}/api/quizzes/${id}`);
      setQuiz(response.data);
      setTimeLeft(response.data.timeLimit * 60); // Convert minutes to seconds
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!showResults && !isSubmitting) {
        setIsSubmitting(true);
        setTimeout(handleSubmit, 1000); // 1 second delay before auto-submitting
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResults, isSubmitting]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(false); // Reset the submitting state
    let newScore = 0;
    quiz.questions.forEach((question, index) => {
      if (question.options[selectedOptions[index]]?.isCorrect) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  if (!quiz)
    return <div className="text-center mt-20 text-2xl">Loading...</div>;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="text-white max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-lg mb-8">{quiz.description}</p>
      <div className="flex justify-end mb-4">
        <FaRegClock className="mr-2" />
        <span className="text-lg">Time Left: {formatTime(timeLeft)}</span>
      </div>
      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-8">
          <p className="text-lg font-bold mb-2">
            {index + 1}. {question.questionText}
          </p>
          {question.options.map((option, idx) => (
            <div key={idx} className="mb-2">
              <input
                type="radio"
                name={`question-${index}`}
                value={idx}
                checked={selectedOptions[index] === idx}
                onChange={() => handleOptionChange(index, idx)}
                className="mr-2"
              />
              <span className="text-lg">{option.text}</span>
            </div>
          ))}
        </div>
      ))}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {showResults && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <p className="text-lg mb-2">
            Score: {score} / {quiz.questions.length}
          </p>
          {quiz.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-bold mb-2">
                {index + 1}. {question.questionText}
              </p>
              <p className="text-lg mb-2">
                Correct answer:{" "}
                {question.options.find((option) => option.isCorrect).text}
              </p>
              <p className="text-lg mb-2">
                Your answer:{" "}
                {selectedOptions[index] !== undefined
                  ? question.options[selectedOptions[index]].text
                  : "Not answered"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
