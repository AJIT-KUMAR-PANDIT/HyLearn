import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main";
import { Trash, Plus } from "lucide-react";

const QuizAdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    passingScore: 0,
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get(`${server}/api/quizzes`);
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  const createQuiz = async () => {
    try {
      await axios.post("/api/quizzes", formData);
      const response = await axios.get(`${server}/api/quizzes`);
      setQuizzes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`${server}/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-6 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createQuiz();
        }}
        className="bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Quiz Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Quiz Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="passingScore"
            className="block text-sm font-medium text-gray-700"
          >
            Passing Score
          </label>
          <input
            type="number"
            id="passingScore"
            placeholder="Passing Score"
            onChange={(e) =>
              setFormData({ ...formData, passingScore: Number(e.target.value) })
            }
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Plus className="mr-2" />
          Add Quiz
        </button>
      </form>
      <ul className="bg-white p-4 rounded-lg shadow-md">
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span className="text-sm text-gray-700">{quiz.title}</span>
            <button
              onClick={() => deleteQuiz(quiz._id)}
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              <Trash className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizAdminDashboard;
