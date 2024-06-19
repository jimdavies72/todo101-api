const passport = require("passport");

exports.jwtRequired = passport.authenticate("jwt", { session: false });
