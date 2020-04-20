const passport = require("passport");

exports.isProtected = function() {
  return passport.authenticate("jwt", { session: false })
};