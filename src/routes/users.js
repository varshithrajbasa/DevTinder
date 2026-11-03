const { profile } = require("../controllers/users");
const router = require("express").Router();

router.get("/profile", profile);

module.exports = router;