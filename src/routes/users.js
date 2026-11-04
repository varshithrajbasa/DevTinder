const { viewProfile, editProfile } = require("../controllers/users");
const router = require("express").Router();

router.get("/view", viewProfile);
router.patch("/edit", editProfile);

module.exports = router;