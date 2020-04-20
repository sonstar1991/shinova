const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Middleware = require("./middleware/common-middlewares");
const userRouter = require("./routes/user-routes");

const app = express();

const port = process.env.PORT || 8000;

Middleware(app);

app.use("/user", userRouter);

//error handling for everything
app.use((req, res, next) => {
  //Error obj by default
  const error = new Error("Not Found");
  //custom 404 handler
  error.status=404;
  next(error);
});
//error database or server side error for operations
app.use((error, req, res, next)=> {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});



//testing routes
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the default API route",
  })
);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
