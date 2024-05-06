var express = require("express");
var router = express.Router();
var { authVerify } = require("../../middleware/auth");
var { companyVerify } = require("../../middleware/company");

var model = require("../../models/companies/company");

router.get("/companies",authVerify,(req, res) => {
  return new model().companiesListing(req, res);
})
router.post("/add", authVerify, (req, res) => {
  return new model().add(req, res);
});
router.post("/companyBring", authVerify, companyVerify, (req, res) => {
  return new model().companyBring(req, res);
});
router.get("/companyget", authVerify, companyVerify, (req, res) => {
  return new model().getCompany(req, res);
});
module.exports = router;
