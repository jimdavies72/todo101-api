// const { checkToken } = require("./middleware");

exports.isAuthenticated = (req, res, next) => {
  try {
    const jwtRequired = passport.authenticate('jwt', { session: false });
    if (jwtRequired) {
     next(); 
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};