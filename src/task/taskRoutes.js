const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  getMyTasks,
  addTask,
  updateSingleTask,
  updateMultiTasks,
  deleteSingleTask,
  deleteMultiTasks,
} = require("./taskControllers");

//const {
//jwtRequired,
//} = require("../middleware");

const taskRouter = Router();

taskRouter.use("*", validateAccessToken);

taskRouter.put("/tasks", getMyTasks);
taskRouter.post("/tasks", addTask);

taskRouter.patch("/tasks/update", updateSingleTask);
taskRouter.put("/tasks/update", updateMultiTasks);

taskRouter.patch("/tasks/delete", deleteSingleTask);
taskRouter.put("/tasks/delete", deleteMultiTasks);

module.exports = taskRouter;
