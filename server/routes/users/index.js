var express = require("express");
var router = express.Router();
var { authVerify } = require("../../middleware/auth")
var { usersVerify } = require("../../middleware/users")
var model = require("../../models/users/users")

router.get("/listing",authVerify, (req, res) => {
    return new model().usersListing(req, res);
});
router.post("/add",authVerify, (req, res) => {
    return new model().userAdd(req, res);
});
module.exports = router;
    