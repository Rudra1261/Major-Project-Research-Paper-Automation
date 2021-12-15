import express from "express";
import { check, validationResult } from "express-validator";
const router = express.Router();
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be of minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    let { email, name, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email has been taken" }] });
      }
      let salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const userRegister = new User({
        name,
        email,
        password,
      });
      await userRegister.save();
      const payload = {
        userRegister: {
          id: userRegister.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jsecretkey"),
        { expiresIn: 1800 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).json("Server Error");
    }
  }
);
export default router;

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUmVnaXN0ZXIiOnsiaWQiOiI2MWFmMTNkM2ZiMzM0ZGQyZjlmNzljODgifSwiaWF0IjoxNjM4ODYzODI4LCJleHAiOjE2Mzg4NjU2Mjh9.KNN6teou679oJPpsrsr9zEbEIC9oqg6nsDjOuKXRb24"
