const JWT = require("jsonwebtoken");
const User = require("../models/user");

const viewProfile = (async (req, res) => {
    try {
        const user = req.user;
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

const editProfile = (async (req, res) => {
    try{
        const user = req.user;
        const fields = ["firstName", "lastName", "age", "gender", "skills"];
        fields.forEach(field => {
            if(req.body[field]){
                user[field] = req.body[field];
            }
        });
        await user.save();
        res.json({ message: "Profile updated successfully", data: {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            skills: user.skills
        } });
    } catch(error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { viewProfile, editProfile };