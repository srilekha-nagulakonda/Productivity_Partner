// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../components/Progress";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const toast = useToast();
  const [priority, setPriority] = useState("personal");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    name: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data.filter((task) => task.priority === "personal"));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleCompletion = async (id, completed) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, completed: !completed } : task
          )
        );
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTaskData({
      name: task.name,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().split("T")[0],
      completed: task.completed,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTaskData({ ...editTaskData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTaskData),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
        setEditTaskId(null);
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    setEditTaskId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const taskNameMatches = task.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const taskDateMatches = new Date(task.dueDate)
      .toLocaleDateString()
      .includes(searchQuery);
    const taskStatusMatches =
      (searchQuery.toLowerCase() === "completed" && task.completed) ||
      (searchQuery.toLowerCase() === "incomplete" && !task.completed);
    return taskNameMatches || taskDateMatches || taskStatusMatches;
  });

  const completedTasksCount = filteredTasks.filter(
    (task) => task.completed
  ).length;
  const completionPercentage =
    filteredTasks.length > 0
      ? (completedTasksCount / filteredTasks.length) * 100
      : 0;

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/tasks", {
        name,
        description,
        priority,
        dueDate,
      });

      if (response.status === 201) {
        setName("");
        setDescription("");
        setPriority("personal");
        setDueDate("");
        // alert("Task added successfully");
        toast({
          title: "Assignment Added Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.error("Failed to add task:", response.data);
        alert("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  return (
    <div className="ProfesBody">
      <Navbar />
      <div className="quote">Space your appointments wisely</div>
      <div className="containerProfessional">
        <h1 className="Professionalh1">Add Task</h1>
        <form className="Professionalform" onSubmit={handleSubmit}>
          <div className="columnContainer">
            <div className="leftColumn">
              <input
                type="text"
                className="inputProfessional"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
              <textarea
                className="inputProfessional"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </div>
            <div className="rightColumn">
              <input
                type="date"
                className="inputProfessional"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <select
                value={priority}
                className="selectProfessional"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="personal">personal</option>
              </select>
            </div>
          </div>
          <button className="professionalbtn" type="submit">
            Add Task
          </button>
        </form>
      </div>
      <div className="quote secondquote">Invest your time, Don't spend it</div>
      <div className="high-container">
        <h1 className="high-title">Personal Tasks</h1>
        <div className="header-row">
          <div>
            <h3 className="high-h3">
              {" "}
              Search the Assignment by Name/Date/Status
            </h3>
            <input
              type="text"
              placeholder="Search by name, date, or status"
              value={searchQuery}
              onChange={handleSearchChange}
              className="high-search"
            />
          </div>
          <div style={{ width: "200px", marginRight: "50px" }}>
            <CircularProgress value={completionPercentage} />
          </div>
        </div>

        <ul className="high-task-list">
          {filteredTasks.map((task) => (
            <li key={task._id} className="high-task-item">
              {editTaskId === task._id ? (
                <>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={editTaskData.name}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={editTaskData.description}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Due Date:
                    <input
                      type="date"
                      name="dueDate"
                      value={editTaskData.dueDate}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Completed:
                    <input
                      type="checkbox"
                      name="completed"
                      checked={editTaskData.completed}
                      onChange={() =>
                        setEditTaskData({
                          ...editTaskData,
                          completed: !editTaskData.completed,
                        })
                      }
                    />
                  </label>
                  <button
                    className="high-save"
                    onClick={() => handleSave(task._id)}
                  >
                    Save
                  </button>
                  <button className="high-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2>{task.name}</h2>
                  <p>
                    {expandedDescriptionId === task._id
                      ? task.description
                      : `${task.description.slice(0, 100)}${
                          task.description.length > 100 ? "..." : ""
                        }`}
                    {task.description.length > 100 && (
                      <button
                        className="high-more"
                        onClick={() => toggleDescription(task._id)}
                      >
                        {expandedDescriptionId === task._id ? "Less" : "More"}
                      </button>
                    )}
                  </p>
                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
                  <button
                    className="high-edit"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="high-remove"
                    onClick={() => handleRemove(task._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="high-toggle"
                    onClick={() =>
                      handleToggleCompletion(task._id, task.completed)
                    }
                  >
                    Mark as {task.completed ? "Incomplete" : "Completed"}
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
