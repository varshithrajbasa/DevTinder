const JWT = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const viewProfile = (async (req, res) => {
    try {
        const user = req.user;
        res.json({
            message: "Profile fetched successfully", user: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                yearOfBirth: user.yearOfBirth,
                gender: user.gender,
                skills: user.skills
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const editProfile = (async (req, res) => {
    try {
        const user = req.user;
        const fields = ["firstName", "lastName", "yearOfBirth", "gender", "skills"];
        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });
        await user.save();
        res.json({
            message: "Profile updated successfully", user: {
                firstName: user.firstName,
                lastName: user.lastName,
                yearOfBirth: user.yearOfBirth,
                gender: user.gender,
                skills: user.skills
            }
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const updatePassword = async (req, res) => {
    try {
        const user = req.user;
        const { oldPassword, password } = req.body;
        const isMatch = await user.validatePassword(oldPassword);
        if (!isMatch) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS),
        );
        user.password = hashedPassword;
        user.save();
        res.clearCookie("token");
        res.json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error updating the password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { viewProfile, editProfile, updatePassword };