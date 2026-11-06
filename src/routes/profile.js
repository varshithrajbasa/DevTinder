const { viewProfile, editProfile } = require("../controllers/profile");
const router = require("express").Router();

router.get("/view", viewProfile);
router.patch("/edit", editProfile);

module.exports = router;