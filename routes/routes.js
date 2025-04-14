import express from "express";
import { getHome, getCompleted, getUnfinished, getAll, postAddTask, postToggleTask, postDeleteTask, postUpdateTask } from "../controllers/subscriberController.js";

const router = express.Router();

router.get("/", getHome);

router.get("/completed", getCompleted);

router.get("/unfinished", getUnfinished);

router.get("/all-tasks", getAll);

router.post("/add-task", postAddTask);

router.post("/toggle-task/:id", postToggleTask);

router.post("/delete-task/:id", postDeleteTask);

router.post("/update-task/:id", postUpdateTask);




export default router;
