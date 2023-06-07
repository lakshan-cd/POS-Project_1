const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const {logIn} = require("../controllers/Users.controller")
// router.get("/", async (rea, res) => {
//   const listofUsers = await Users.findAll();
//   res.json(listofUsers);
// });

router.get("/", (req, res) => {
  res.json("hello world");
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Users.create(post);
  res.json(post);
});

router.post("/login",logIn)

// router.post();

module.exports = router;
