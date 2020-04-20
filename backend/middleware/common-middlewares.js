const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportStrategy = require("./passport-strategy");
const session = require("express-session");

module.exports = function CommonMiddleWare(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: "dfhiuwdhfuh",
  //     resave: false,
  //     saveUninitialized: false,
  //   })
  // );
  app.use(passport.initialize());
  passportStrategy(passport);
  // app.use(passport.session());

  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
};
