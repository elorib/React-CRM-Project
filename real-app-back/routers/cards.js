const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const auth = require("../middleware/auth");
const { Card, validateCard, generateBizNumber } = require("../models/cards");

router.delete("/:id", auth, async (req, res) => {
  let card = await Card.findOne({ _id: req.params.id, user_id: req.user.id });

  if (!card) {
    res.status(404).send("card not found");
    return;
  }
  card = await Card.deleteOne({ _id: req.params.id, user_id: req.user.id });
  res.send(card);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let card = await Card.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user.id,
    },
    req.body,
    {
      new: true,
    }
  );
  if (!card) {
    res.status(404).send("card not found");
    return;
  }
  res.send(card);
});

router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({ _id: req.params.id, user_id: req.user.id });
  console.log(card);

  if (!card) {
    res.status(404).send("card not found");
    return;
  }
  res.send(card);
});

router.get("/", async (req, res) => {
  const allCards = await Card.find();

  if (!allCards) {
    res.status(404).send("no cards found");
    return;
  }
  res.send(allCards);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let card = await new Card({
    bizImage: "../image.jpg",
    ...req.body,
    bizNumber: await generateBizNumber(),
    user_id: req.user.id,
  }).save();

  res.send(card);
});

module.exports = router;
