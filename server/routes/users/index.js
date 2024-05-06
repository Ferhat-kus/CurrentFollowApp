var express = require("express");
var router = express.Router();
var { authVerify } = require("../../middleware/auth")
var { usersVerify } = require("../../middleware/users")
var model = require("../../models/users/users")

router.get("/users",authVerify, (req, res) => {
    return new model().usersListing(req, res);
});
module.exports = router;
    