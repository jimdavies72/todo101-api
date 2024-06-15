const { Router } = require("express");
const authRouter = Router();
const { authenticate, callback, currentSession, logout } = require("./authControllers");

authRouter.get('/login', authenticate);
authRouter.get('/callback', callback);
authRouter.get('/current-session', currentSession);
authRouter.get('/logout', logout);

module.exports = authRouter;