const { viewProfile, editProfile, updatePassword } = require("../controllers/profile");
const router = require("express").Router();

router.get("/view", viewProfile);
router.patch("/edit", editProfile);
router.patch("/password/update", updatePassword);

module.exports = router;