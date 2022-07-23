const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const auth = require("../middleware/auth");
const { validateUser, User } = require("../models/users");
const { validateCards } = require("../models/users");

const router = express.Router();

router.patch("/cards", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("-password");
  console.log(req.user);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send("This user already exists");
  }
  user = await new User(req.body);

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(lodash.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
