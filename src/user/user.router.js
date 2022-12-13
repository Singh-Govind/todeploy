const express = require("express");
const User = require("./user.model");

const app = express.Router();

app.post("/register", async (req, res) => {
  try {
    let user = await User.create(req.body);
    res.send({ msg: "user created successfully", user });
  } catch (e) {
    res.status(403).send({ msg: "please enter correct details" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      return res.status(400).send({ msg: "no user found" });
    }

    res.send({ msg: "login successfull", token: user.id });
  } catch (e) {
    res.status(401).send({ msg: "please enter correct details" });
  }
});

app.get("/getprofile", async (req, res) => {
  let auth = req.headers["authorization"];

  if (!auth) {
    return res.status(401).send({ msg: "You are not logged in" });
  }

  try {
    let user = await User.findById(auth);
    res.send(user);
  } catch (e) {
    res.status(403).send({ msg: "no user found" });
  }
});

app.get("/calculateemi", (req, res) => {
  let auth = req.headers["authorization"];

  if (!auth) {
    return res.status(401).send({ msg: "You are not logged in" });
  }
  try {
    let { amount, rate, tenure } = req.body;

    if (!amount || !rate || !tenure) {
      return res.status(403).send({ msg: "please give all the details" });
    }

    amount = parseInt(amount);
    rate = parseInt(rate);
    tenure = parseInt(tenure);

    let cal = Math.floor(
      (amount * rate * (1 + rate) * tenure) / ((1 + rate) * tenure - 1)
    );

    res.send({ total: cal });
  } catch (e) {
    res.status(500).send({ msg: "something went bad" });
  }
});

module.exports = app;
