import { getAllTasks, getCompletedTasks, getUnfinishedTasks, addTask, toggleTask, deleteTask, updateTask } from "../models/subscriberModel.js";

export const getHome = async (req, res) => {
  const tasks = await getAllTasks();
  res.render("task", { tasks });
};

export const getCompleted = async (req, res) => {
  const completedTasks = await getCompletedTasks();
  res.render("completed", { completedTasks });
};

export const getUnfinished = async (req, res) => {
  const unfinishedTasks = await getUnfinishedTasks();
  res.render("unfinished", { unfinishedTasks });
};

export const getAll = async (req, res) => {
  const tasks = await getAllTasks();
  res.render("all-tasks", { tasks });
};

export const postAddTask = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send({ message: "Name and description are required" });
  }
  
  await addTask(name, description);
  res.redirect("/");
};

export const postToggleTask = async (req, res) => {
  const id = parseInt(req.params.id);
  await toggleTask(id);
  res.redirect("/");
};

export const postDeleteTask = async (req, res) => {
  const id = parseInt(req.params.id);
  await deleteTask(id);
  res.redirect("/");
};

export const postUpdateTask = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  await updateTask(id, name, description);
  res.redirect("/");
};
