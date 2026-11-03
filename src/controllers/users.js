const JWT = require("jsonwebtoken");
const User = require("../models/user");

const profile = (async (req, res) => {
    try {
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
        res.json({ message: "Profile fetched successfully", data: {
            firstName: user.firstName,
            lastName: user.lastName,
            emailId: user.emailId,
            age: user.age,
            gender: user.gender,
            skills: user.skills
        } });
    } catch(error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { profile };