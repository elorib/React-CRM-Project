const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = authenticateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).send("Invalid email or password");
  }

  const token = user.generateAuthToken();

  res.send({ token });
});

function authenticateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = router;
