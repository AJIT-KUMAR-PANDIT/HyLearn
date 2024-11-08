import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlusSquare, FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { server } from "../../main";

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    timeLimit: 0,
    difficulty: "",
    passingScore: 0,
    questions: [],
    id: "",
  });

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

  const openEditModal = (quiz) => {
    setEditFormData({
      ...quiz,
      questions: quiz.questions ? [...quiz.questions] : [], // Ensure questions are set
      id: quiz._id,
    });
    setEditModalOpen(true);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditQuestionChange = (index, field, value) => {
    const updatedQuestions = [...editFormData.questions];
    updatedQuestions[index][field] = value;
    setEditFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleEditOptionChange = (qIndex, oIndex, field, value) => {
    const updatedQuestions = [...editFormData.questions];
    updatedQuestions[qIndex].options[oIndex][field] = value;
    setEditFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addEditQuestion = () => {
    setEditFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion }],
    }));

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

  const deleteEditQuestion = (index) => {
    const updatedQuestions = [...editFormData.questions];
    updatedQuestions.splice(index, 1);
    setEditFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const saveEditedQuiz = async () => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const { id, ...quizData } = editFormData; // Extract ID to use in URL
      await axios.put(`${server}/api/quizzes/${id}`, quizData);
      setSuccess("Quiz updated successfully!");
      setEditModalOpen(false);
      fetchQuizzes();
    } catch (err) {
      setError("Failed to update quiz. Please try again.");
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
                    onClick={() => openEditModal(quiz)}
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
      {/* Edit Quiz Modal */}
      {editModalOpen && (
        <div className="overflow-auto pt-12 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Quiz</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose />
              </button>
            </div>

            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleEditInputChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditInputChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <label className="block text-sm font-medium mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              name="timeLimit"
              value={editFormData.timeLimit}
              onChange={handleEditInputChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              name="difficulty"
              value={editFormData.difficulty}
              onChange={handleEditInputChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <h3 className="font-semibold text-lg mb-2">Questions</h3>
            {editFormData.questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-4 border-b pb-4">
                <label className="block text-sm font-medium mb-2">
                  Question Text
                </label>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    handleEditQuestionChange(
                      qIndex,
                      "questionText",
                      e.target.value
                    )
                  }
                  className="w-full mb-2 p-2 border rounded"
                />

                <label className="block text-sm font-medium mb-2">
                  Explanation
                </label>
                <input
                  type="text"
                  value={question.explanation}
                  onChange={(e) =>
                    handleEditQuestionChange(
                      qIndex,
                      "explanation",
                      e.target.value
                    )
                  }
                  className="w-full mb-2 p-2 border rounded"
                />

                <label className="block text-sm font-medium mb-2">
                  Options
                </label>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        handleEditOptionChange(
                          qIndex,
                          oIndex,
                          "text",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded mr-2"
                    />
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleEditOptionChange(
                          qIndex,
                          oIndex,
                          "isCorrect",
                          e.target.checked
                        )
                      }
                      className="form-checkbox"
                    />
                    <label className="ml-1">Correct</label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => deleteEditQuestion(qIndex)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <FaRegTrashCan className="w-5 h-5" /> Delete Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEditQuestion}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              <FaPlusSquare className="w-5 h-5 inline-block mr-1" /> Add
              Question
            </button>

            <button
              onClick={saveEditedQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizAdminDashboard;
