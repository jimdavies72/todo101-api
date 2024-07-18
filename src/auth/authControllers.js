require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// exports.callback = (req, res, next) => {
//   try {
//     passport.authenticate("auth0", (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return res.redirect("/login");
//       }

//       const userReturnObject = {
//         id: user.id,
//         nickname: user.nickname,
//         email: user.displayName,
//       };
//       req.session.jwt = jwt.sign(userReturnObject, process.env.JWT_SECRET_KEY);
//       return res.redirect("/");
//     })(req, res, next);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

exports.callback = (req, res, next) => {
  try {
    passport.authenticate("auth0", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || "/");
      });
    })(req, res, next);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.currentSession = (req, res) => {
  try {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        res.send(false);
      } else {
        res.send(user);
      }
    })(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logout = (req, res) => {
  try {
    req.logOut();
    req.session = null;
    const homeURL = encodeURIComponent(process.env.AUTH0_BASE_URL);
    res.redirect(
      `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${homeURL}&client_id=${process.env.AUTH0_CLIENT_ID}`
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};
