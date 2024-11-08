import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  explanation: {
    type: String,
    default: "",
  },
  points: {
    type: Number,
    default: 1,
  },
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: Number,
    default: 30,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "intermediate",
  },
  questions: [questionSchema],
  totalPoints: {
    type: Number,
    default: 0,
  },
  passingScore: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

quizSchema.pre("save", function (next) {
  this.totalPoints = this.questions.reduce(
    (sum, question) => sum + question.points,
    0
  );
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Quiz", quizSchema);
