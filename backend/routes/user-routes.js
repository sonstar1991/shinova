const router = require("express").Router();
const userController = require("../controllers/user");
const passportStrategy = require("../middleware/passport-strategy");
const protectedRoute = require("../middleware/protected-route");
const passport= require('passport')



router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/secret',  passport.authenticate('jwt', { session: false }), userController.secret)
router.delete('/logout',passport.authenticate('jwt', { session: false }), userController.logout);






module.exports = router;
