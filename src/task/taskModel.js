const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  taskTitle: {
    type: String,
    required: true
  },
  taskDescription: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Test = mongoose.model("Task", taskSchema);

module.exports = Test;