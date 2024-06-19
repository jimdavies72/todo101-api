const passport = require("passport");
const { Router } = require("express");
const { addTestString, getTestStrings } = require("./testControllers");
const {
  jwtRequired
} = require('../middleware');

const testRouter = Router();

testRouter.get("/test", getTestStrings);
testRouter.post("/test", addTestString);
testRouter.put("/test", jwtRequired, getTestStrings);

module.exports = testRouter;
