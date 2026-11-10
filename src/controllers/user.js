const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const USER_FIELDS = ["firstName", "lastName", "age", "gender", "skills"];

const getUserConnections = async (userId, status) => {
    let query = status
        ? [
              { fromUserId: userId, status: status },
              { toUserId: userId, status: status },
          ]
        : [{ fromUserId: userId }, { toUserId: userId }];
    const userConnections = await ConnectionRequest.find({
        $or: query,
    }).populate("fromUserId toUserId", USER_FIELDS.join(" "));

    const users = userConnections.map((connection) => {
        return connection.fromUserId._id.toString() === userId.toString()
            ? connection.toUserId
            : connection.fromUserId;
    });
    return users;
};

const getConnections = async (req, res) => {
    try {
        const userId = req.user._id;
        const users = await getUserConnections(userId, "accepted");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConnectionRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: userId,
            status: "interested",
        });
        res.json({ connectionRequests }).populate(
            "fromUserId",
            USER_FIELDS.join(" "),
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeed = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) > 50 ? 50 : parseInt(req.query.limit) || 10;
        const hideUsers = await getUserConnections(userId);
        const users = await User.find({
            _id: {
                $nin: [...hideUsers.map((user) => user._id), userId],
            },
        })
            .select(USER_FIELDS.join(" "))
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({ users: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getConnections,
    getConnectionRequests,
    getFeed,
};
