const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const model = require("../../models/auth/auth");

router.post("/sign/in", (req, res) => {
  return new model().signIn(req, res);  
});

router.post("/sign/up", (req, res) => {
  return new model().signUp(req, res);
});

module.exports = router;
