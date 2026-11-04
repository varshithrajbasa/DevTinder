const JWT = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = await JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            return decoded;
        });
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
};  

module.exports = auth;