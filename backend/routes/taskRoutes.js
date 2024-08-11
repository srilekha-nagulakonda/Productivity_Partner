const express = require("express");
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { name, description, priority, dueDate } = req.body;

    const newTask = await Task.create({
      name,
      description,
      priority,
      dueDate,
      userId: req.user._id,
    });

    res.status(201).json(newTask);
  })
);

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  })
);

router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task && task.userId.toString() === req.user._id.toString()) {
      await task.remove();
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  })
);

router.patch(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task && task.userId.toString() === req.user._id.toString()) {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  })
);

module.exports = router;
