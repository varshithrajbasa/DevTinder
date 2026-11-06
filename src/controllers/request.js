const ConnectionRequest = require("../models/connectionRequest");

const sendRequest = async (req, res) => {
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
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ error: "Request already sent" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const savedRequest = await connectionRequest.save();

        res.status(201).json({
            message: `Request sent successfully`,
            request: savedRequest,
        });
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const reviewRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const status = req.params.status;
        if (!requestId || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        } else if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const request = await ConnectionRequest.find({
            _id: requestId,
            status: "interested",
            toUserId: req.user._id,
        });
        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }

        if (request.toUserId.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({
                    error: "You are not authorized to review this request",
                });
        }

        request.status = status;
        const updatedRequest = await request.save();

        res.status(200).json({
            message: "Request reviewed successfully",
            request: updatedRequest,
        });
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    sendRequest,
    reviewRequest,
};
