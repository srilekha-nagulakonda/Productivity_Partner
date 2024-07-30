import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HighPriorityPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    name: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data.filter((task) => task.priority === "high"));
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

  return (
    <div className="high-container">
      <h1 className="high-title">High Priority Tasks</h1>
      <input
        type="text"
        placeholder="Search by name, date, or status"
        value={searchQuery}
        onChange={handleSearchChange}
        className="high-search"
      />
      <div className="progress">
        <div
          className="progress-bar progress-bar-success progress-bar-striped"
          role="progressbar"
          aria-valuenow={completionPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${completionPercentage}%` }}
        >
          {`${completionPercentage.toFixed(2)}% Complete`}
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
                <p>{task.description}</p>
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
                <button className="high-edit" onClick={() => handleEdit(task)}>
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
  );
};

export default HighPriorityPage;
