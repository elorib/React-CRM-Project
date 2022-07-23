const mongoose = require("mongoose");
const express = require("express");
const JOI = require("joi");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cards: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
});

userSchema.methods.generateAuthToken = function generateAuthToken() {
  return jwt.sign(
    {
      id: this._id,
      biz: this.biz,
    },
    "Secret"
  );
};

const User = mongoose.model("User", userSchema, "users");

function validateUser(user) {
  const schema = JOI.object({
    name: JOI.string().min(2).max(255).required(),
    email: JOI.string().email().min(6).max(255).required(),
    password: JOI.string().min(6).max(1024).required(),
    biz: JOI.boolean().required(),
  });
  return schema.validate(user);
}

function validateCards(cards) {
  const schema = Joi.object({
    cards: Joi.array()
      .items(Joi.number().min(100).max(9_999_999_999))
      .unique()
      .min(1)
      .required(),
  });
  return schema.validate(cards);
}

module.exports = {
  User,
  validateUser,
  validateCards,
};
