const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const USER_FIELDS = ["firstName", "lastName", "age", "gender", "skills"];

const getConnections = async (req, res) => {
    try {
        const userId = req.user._id;
        const userConnections = await ConnectionRequest.find({
            $or: [
                { fromUserId : userId, status: "accepted" },
                { toUserId : userId, status: "accepted" }
            ]
        }).populate("fromUserId toUserId", USER_FIELDS.join(" "));

        const users = userConnections.map(connection => {
            return connection.fromUserId._id.toString() === userId.toString() ? connection.toUserId : connection.fromUserId;
        });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConnectionRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({toUserId: userId, status: "interested"});
        res.json({ connectionRequests }).populate("fromUserId", USER_FIELDS.join(" "));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeed = async (req, res) => {
    try {
        const userId = req.user._id;
        //TODO

        res.json({ connections });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getConnections,
    getConnectionRequests,
    getFeed
};