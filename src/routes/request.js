const router = require("express").Router();
const { sendRequest, reviewRequest } = require("../controllers/request");

router.post("/send/:status/:toUserId", sendRequest);
router.post("/review/:status/:requestId", reviewRequest);

module.exports = router;