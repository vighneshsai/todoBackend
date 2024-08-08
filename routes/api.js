import express from "express";
const router = express.Router();
import { catchErrors } from "../handlers/errorHandler.js";
import { addData, deleteTask, getTask, updateTask } from "../controllers/todoController.js";

// Use catchErrors middleware to handle errors for async functions
router.route("/todoTask").post(catchErrors(addData));
router.route("/task").get(catchErrors(getTask));
router.route("/task").put(catchErrors(updateTask));
router.route("/task").delete(catchErrors(deleteTask));















export default router;

