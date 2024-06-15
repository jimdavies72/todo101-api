const { Router } = require("express");
const {
  addTestString,
  getTestString,
} = require("./testControllers");
const { isAuthenticated } = require("../middleware");

const testRouter = Router();

testRouter.get("/test", getTestString);
testRouter.post("/test",  addTestString);
testRouter.put("/test", isAuthenticated, getTestString);

module.exports = testRouter;
