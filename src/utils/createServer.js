require("dotenv").config();
const logger = require("morgan");
const express = require("express");
//const session = require("cookie-session");
//const passport = require("../middleware/passport");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const rateLimit = require("express-rate-limit");

const authRouter = require("../auth/authRoutes");
const testRouter = require("../test/testRoutes");
const taskRouter = require("../task/taskRoutes");
const unmatchedRouter = require("../unmatched/unmatchedRoutes");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 30, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

exports.createServer = () => {
  const app = express();
  app.use(express.json());

  app.use(logger("dev"));

  // app.use(
  //   session({
  //     name: "session",
  //     secret: process.env.COOKIE_SECRET,
  //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  //   })
  // );

  // security settings
  app.use(cors());
  app.use(helmet());
  app.use(hpp());
  app.use(limiter);

  //app.use(passport.initialize());
  
  
  app.use("/auth", authRouter);
  app.use(testRouter);
  app.use(taskRouter);
  //TODO: add new routes here:
  
  //default for unmatched routes
  app.use(unmatchedRouter);
  
  app.use(csurf());
  
  return app;
};