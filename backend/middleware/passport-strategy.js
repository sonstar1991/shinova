require("dotenv").config();
const secret = process.env.JWT_SECRET;

const User = require("../models")["User"];
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  algorithms: ["HS256"],
};

const strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
  console.log("payload received", jwt_payload);
  // usually this would be a database call:
  const user = await User.findOne({ id: jwt_payload.id });
  if(user) {
      return done(null, user);
  }else{
      return done(null, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
 