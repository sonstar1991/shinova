const User =require('../controllers/user.js') 




export default app => {
    app.get("/api", (req, res) =>
      res.status(200).send({
        message: "Welcome to the Forms API!"
      })
    )

    
  app.post(
    "/api/user/signup",
    User.signUp
  ); // API route for client to signup
  








}