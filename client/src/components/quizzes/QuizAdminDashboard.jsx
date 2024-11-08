import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlusSquare, FaEdit } from "react-icons/fa";
import { server } from "../../main";
import { AiOutlineClose } from "react-icons/ai";

const QuizAdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeLimit: 30,
    difficulty: "intermediate",
    passingScore: 0,
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    explanation: "",
    points: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditingQuestions, setIsEditingQuestions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${server}/api/quizzes`);
      setQuizzes(response.data);
    } catch (err) {
      setError("Failed to load quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, { text: "", isCorrect: false }],
    });
  };

  const removeOption = (index) => {
    const newOptions = currentQuestion.options.filter((_, i) => i !== index);
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const addQuestion = () => {
    if (
      !currentQuestion.questionText ||
      currentQuestion.options.some((opt) => !opt.text)
    ) {
      setError("Please fill in all question fields");
      return;
    }
    if (!currentQuestion.options.some((opt) => opt.isCorrect)) {
      setError("Please mark at least one correct answer");
      return;
    }

    setFormData({
      ...formData,
      questions: [...formData.questions, currentQuestion],
    });

    setCurrentQuestion({
      questionText: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      explanation: "",
      points: 1,
    });

    setError("");
    setSuccess("Question added successfully!");
  };

  const createQuiz = async () => {
    setError("");
    setSuccess("");

    if (
      !formData.title ||
      !formData.description ||
      formData.passingScore <= 0 ||
      formData.questions.length === 0
    ) {
      setError("Please fill in all fields and add at least one question.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${server}/api/quizzes`, formData);
      await fetchQuizzes();
      setSuccess("Quiz added successfully!");
      setFormData({
        title: "",
        description: "",
        timeLimit: 30,
        difficulty: "intermediate",
        passingScore: 0,
        questions: [],
      });
      setIsEditingQuestions(false);
    } catch (err) {
      setError("Failed to add quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${server}/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      setSuccess("Quiz deleted successfully!");
    } catch (err) {
      setError("Failed to delete quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 pt-6 pb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          Quiz Admin Dashboard
        </h1>

        {error && (
          <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>
        )}
        {success && (
          <div className="text-green-500 mb-4 p-2 bg-green-50 rounded">
            {success}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isEditingQuestions) {
              addQuestion();
            } else {
              createQuiz();
            }
          }}
          className="bg-white p-4 rounded-lg shadow-md mb-6"
        >
          {!isEditingQuestions ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        timeLimit: Number(e.target.value),
                      })
                    }
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Passing Score
                  </label>
                  <input
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passingScore: Number(e.target.value),
                      })
                    }
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                  rows="3"
                />
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsEditingQuestions(true)}
                  className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Add Questions ({formData.questions.length})
                </button>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
                >
                  <FaPlusSquare className="mr-2" />
                  {loading ? "Creating..." : "Create Quiz"}
                </button>
              </div>
            </>
          ) : (
            <div className="question-form">
              <h2 className="text-xl font-semibold mb-4">Add Question</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Question Text
                </label>
                <input
                  type="text"
                  value={currentQuestion.questionText}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      questionText: e.target.value,
                    })
                  }
                  className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        updateOption(index, "text", e.target.value)
                      }
                      className="flex-1 p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                      placeholder={`Option ${index + 1}`}
                    />
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        updateOption(index, "isCorrect", e.target.checked)
                      }
                      className="w-4 h-4"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOption}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Option
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Points
                  </label>
                  <input
                    type="number"
                    value={currentQuestion.points}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        points: Number(e.target.value),
                      })
                    }
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Explanation
                </label>
                <textarea
                  value={currentQuestion.explanation}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      explanation: e.target.value,
                    })
                  }
                  className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300"
                  rows="2"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditingQuestions(false)}
                  className="text-gray-600 hover:text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Back to Quiz Details
                </button>
                <button
                  type="submit"
                  className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Add Question
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Existing Quizzes</h2>
          {loading ? (
            <p>Loading quizzes...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <li
                  key={quiz._id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <h3 className="text-lg font-medium">{quiz.title}</h3>
                    <p className="text-sm text-gray-500">
                      {quiz.questions?.length || 0} questions • {quiz.timeLimit}{" "}
                      minutes •
                      {quiz.difficulty.charAt(0).toUpperCase() +
                        quiz.difficulty.slice(1)}
                    </p>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    onClick={handleOpenModal}
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz._id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaRegTrashCan className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      // ??modal for edit
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Update Quiz</h2>
              <AiOutlineClose
                className="cursor-pointer"
                size={24}
                onClick={handleCloseModal}
              />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet nulla auctor, vestibulum magna sed, convallis ex.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizAdminDashboard;
