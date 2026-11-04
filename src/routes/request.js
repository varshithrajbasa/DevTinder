const router = require("express").Router();
const ConnectionRequest = require("../models/connectionRequest");


router.post("/send/:status/:toUserId", async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        if (!fromUserId || !toUserId || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        } else if (!["interested", "ignored"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ error: "Request already sent" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const savedRequest = await connectionRequest.save();

        res.status(201).json({ message: `Request sent successfully`, request: savedRequest });

    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;