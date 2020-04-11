const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const passport = require('passport')


module.exports = function CommonMiddleWare(app) {
  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
};
