require("dotenv").config();
const secret = process.env.JWT_SECRET;

const User = require("../models")["User"];
const wrap = require("express-async-wrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: wrap(async (req, res) => {
    const { name, email } = req.body;
    let { password } = req.body;

    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({ name, email, password });

    if (newUser) {
      console.log(newUser);
      const jwtPayload = {
        email: newUser.email,
        password: newUser.password,
      };

      const token = jwt.sign(jwtPayload, secret, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      });

      res.status(200).send({
        message: "New user created",
        token,
      });
    } else {
      return res.status(403).json({ message: "register route issue" });
    }
  }),

  login: wrap(async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(404).json({ message: "Username and password are needed!" });
    } else {
      const { email, password } = req.body;
      // usually this would be a database call:
      const existingUser = await User.findOne({ where: { email: email } });

      if (!existingUser && !existingUser.email) {
        res.status(401).json({ msg: "no such user found" });
      }
      const match = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );

      if (existingUser && match) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        const jwtPayload = {
          id: existingUser.id,
        };

        jwt.sign(
          jwtPayload,
          secret,
          {
            expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          (err, token) => {
            if (err) {
              return (err);
            } else {
              
              res
                .status(200)
                .json({ message: "User is logged-in", token: "Bearer " + token });
            }
          }
        );
      
      } else {
        res.status(401).json({
          message: "email or password is not correct-password did not match",
        });
      }
    }
  }),

  secret: wrap(async (req, res) => {
    res.json({ message: "Success! You can not see this without a token" });
  }),


  logout: wrap(async (req, res)=>{
    if(token){
      jwt.destory(token)
    }
    res.json({
      message: "Signout Successful"
    });
  })
};
