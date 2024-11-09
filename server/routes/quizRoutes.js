import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizzes.js";

const router = express.Router();

router.post("/", isAuth, isAdmin, createQuiz);
router.get("/", isAuth, getAllQuizzes);
router.get("/:id", isAuth, getQuiz);
router.put("/:id", isAuth, isAdmin, updateQuiz);
router.delete("/:id", isAuth, isAdmin, deleteQuiz);

export default router;
