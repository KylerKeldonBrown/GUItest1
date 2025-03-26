import { query } from "../config/db.js";

export const getAllTasks = async () => {
  try {
    const result = await query("SELECT * FROM tasks ORDER BY id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getCompletedTasks = async () => {
  try {
    const result = await query("SELECT * FROM tasks WHERE completed = true ORDER BY id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    throw error;
  }
};

export const getUnfinishedTasks = async () => {
  try {
    const result = await query("SELECT * FROM tasks WHERE completed = false ORDER BY id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching unfinished tasks:", error);
    throw error;
  }
};

export const addTask = async (name, description) => {
  try {
    await query("INSERT INTO tasks (name, description, completed) VALUES ($1, $2, false)", [name, description]);
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const toggleTask = async (id) => {
  try {
    await query("UPDATE tasks SET completed = NOT completed WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error toggling task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await query("DELETE FROM tasks WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTask = async (id, name, description) => {
  try {
    await query("UPDATE tasks SET name = $1, description = $2 WHERE id = $3", [name, description, id]);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
