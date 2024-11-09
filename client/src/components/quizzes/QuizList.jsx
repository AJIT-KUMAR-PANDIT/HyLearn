import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../loading/Loading";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${server}/api/quizzes`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Available Quizzes</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="space-y-2">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white shadow p-4 rounded-lg">
              <Link to={`/quiz/${quiz._id}`} className="text-lg font-medium">
                <div className="max-w-3xl min-h-[32px]"> {quiz.title}</div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
