import { 
    getAllTasks, 
    getCompletedTasks, 
    getUnfinishedTasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    updateTask 
  } from "../models/subscriberModel.js";
  
  // Validation function
  const validateTaskInput = (name, description, priority) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const descriptionRegex = /^[A-Za-z0-9 .,]+$/;
    const validPriorities = ["High", "Medium", "Low"];
  
    const errors = [];
    if (!name || name.trim().length < 3 || name.length > 100 || !nameRegex.test(name)) {
      errors.push("Name must be 3-100 characters and contain only letters and spaces.");
    }
    if (!description || description.trim().length < 5 || description.length > 500 || !descriptionRegex.test(description)) {
      errors.push("Description must be 5-500 characters and contain only valid characters.");
    }
    if (!validPriorities.includes(priority)) {
      errors.push("Priority must be High, Medium, or Low.");
    }
  
    return errors;
  };
  
  export const getHome = async (req, res) => {
    const tasks = await getAllTasks();
    const {
      error = null,
      updateError = null,
      name = '',
      description = '',
      priority = 'Medium',
      updateName = '',
      updateDesc = '',
      updatePriority = 'Medium',
      id = ''
    } = req.query;
    
    res.render("task", {
      tasks,
      error,
      updateError,
      name,
      description,
      priority,
      updateName,
      updateDesc,
      updatePriority,
      id
    });
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
    const { name, description, priority } = req.body;
    const errors = validateTaskInput(name, description, priority);
  
    if (errors.length > 0) {
      return res.redirect(
        `/?error=${encodeURIComponent(errors.join(' '))}` +
        `&name=${encodeURIComponent(name)}` +
        `&description=${encodeURIComponent(description)}` +
        `&priority=${encodeURIComponent(priority)}`
      );
    }
  
    await addTask(name, description, priority);
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
    const { name, description, priority } = req.body;
    const errors = validateTaskInput(name, description, priority);
  
    if (errors.length > 0) {
      return res.redirect(
        `/?updateError=${encodeURIComponent(errors.join(' '))}` +
        `&updateName=${encodeURIComponent(name)}` +
        `&updateDesc=${encodeURIComponent(description)}` +
        `&updatePriority=${encodeURIComponent(priority)}` +
        `&id=${id}`
      );
    }
  
    await updateTask(id, name, description, priority);
    res.redirect("/");
  };
  