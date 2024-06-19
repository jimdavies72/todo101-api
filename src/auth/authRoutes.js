const passport = require("passport");
const { Router } = require("express");
const authRouter = Router();

const {
  callback,
  currentSession,
  logout,
} = require("./authControllers");

authRouter.get("/login", passport.authenticate("auth0", { scope: "openid email profile" }),
  (req, res) => {
    res.redirect("/");
  }
);
authRouter.get("/callback", callback);
authRouter.get("/current-session", currentSession);
authRouter.get("/logout", logout);

module.exports = authRouter;
