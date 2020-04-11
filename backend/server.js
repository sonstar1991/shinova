const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Middleware = require("./middleware/common-middlewares");
const routes = "./routes/common-routes.js";

const app = express();

const port = process.env.PORT || 8000;

Middleware(app);

routes(app);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default API route',
}));

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
