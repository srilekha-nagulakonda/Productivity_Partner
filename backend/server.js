const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("../backend/routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {
  notFound,
  errorHandler,
} = require("../backend/middleware/errorMiddleware");
const { authenticateToken } = require("../backend/controllers/userControllers");

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
    userNumber: {
      type: Number,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

// Create Task
app.post("/api/postTask", authenticateToken, async (req, res) => {
  try {
    const { name, description, priority, dueDate } = req.body;
    const userNumber = req.user.userNumber; // Ensure this is defined
    if (!userNumber) {
      return res.status(403).json({ message: "User number is missing" });
    }

    if (!name || !priority || !dueDate) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    const newTask = await Task.create({
      name,
      description,
      priority,
      dueDate,
      userNumber: req.user.userNumber, // Associate the task with the authenticated user's unique number
    });

    res.status(201).send(newTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).send({ message: "Failed to add task", error });
  }
});

// Apply `authenticateToken` middleware to protect other routes
app.get("/api/alltasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userNumber: req.user.userNumber }); // Only get tasks for the authenticated user by their unique number
    res.status(200).send(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).send({ message: "Failed to retrieve tasks", error });
  }
});

app.delete("/api/deltasks/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userNumber: req.user.userNumber, // Ensure the task belongs to the authenticated user by their unique number
    });
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send({ message: "Failed to delete task", error });
  }
});

app.patch("/api/updatetasks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userNumber: req.user.userNumber }, // Ensure the task belongs to the authenticated user by their unique number
      updatedData,
      { new: true }
    );
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// User Routes
app.use("/api/user", userRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on PORT ${port}...`);
});
