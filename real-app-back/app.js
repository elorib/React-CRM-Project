const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const cardsRouter = require("./routers/cards");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost/nodejs-project")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("could not connect to mongodb", error));

app.use(morgan("dev"));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);

const PORT = 4000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
