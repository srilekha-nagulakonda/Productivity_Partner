const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("../backend/routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  notFound,
  errorHandler,
} = require("../backend/middleware/errorMiddleware");

dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json()); // to accept json data

// Updated Task schema with name, description, and dueDate
const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      required: true,
      enum: ["high", "medium", "personal"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

// Updated POST route to handle new fields
app.post("/api/tasks", async (req, res) => {
  try {
    const { name, description, priority, dueDate } = req.body;
    const newTask = await Task.create({
      name,
      description,
      // task,
      priority,
      dueDate,
    });

    res.status(201).send(newTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).send({ message: "Failed to add task", error });
  }
});

// Existing GET route
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).send({ message: "Failed to retrieve tasks", error });
  }
});

// Delete task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send({ message: "Failed to delete task", error });
  }
});

// Update task completion status
app.patch("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Uncomment and define the userRoutes if needed
// const userRoutes = require('./routes/userRoutes');

// const TaskSchema = new mongoose.Schema(
//   {
//     task: {
//       type: String,
//       required: true,
//     },
//     priority: {
//       type: String,
//       required: true,
//       enum: ["high", "medium", "low"], // You can define acceptable values
//       default: "medium",
//     },
//   },
//   { timestamps: true }
// );

// const Task = mongoose.model("Task", TaskSchema);

// app.post("/api/tasks", async (req, res) => {
//   try {
//     const { task, priority } = req.body;
//     // const newTask = new Task({ task, priority });
//     const newTask = await Task.create({
//       task,
//       priority,
//     });

//     // await newTask.save();
//     res.status(201).send(newTask);
//   } catch (error) {
//     console.error("Error saving task:", error);
//     res.status(500).send({ message: "Failed to add task", error });
//   }
// });

// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).send(tasks);
//   } catch (error) {
//     console.error("Error retrieving tasks:", error);
//     res.status(500).send({ message: "Failed to retrieve tasks", error });
//   }
// });

app.use("/api/user", userRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
const Port = process.env.PORT || 5000;

const server = app.listen(Port, () => {
  console.log(`Server running on PORT ${Port}...`.yellow.bold);
});
