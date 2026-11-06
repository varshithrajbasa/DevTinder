const router = require("express").Router();
const { getConnections, getConnectionRequests, getFeed } = require("../controllers/user");

router.get("/connections", getConnections);
router.get("/requests/received", getConnectionRequests);
router.get("/feed", getFeed);

module.exports = router;