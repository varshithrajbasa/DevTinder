const User = require("../models/user");
const validation = require("../utils/validation");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, age, gender, skills } =
            req.body;
        const requiredFields = [
            "firstName",
            "lastName",
            "emailId",
            "password",
            "age",
            "gender",
        ];
        if (!validation(req.body, requiredFields)) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const isUserExists = await User.findOne({ emailId });
        if (isUserExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS),
        );
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            age,
            gender,
            skills,
        });
        await user.save();
        res.status(201).json({
            firstName: user.firstName,
            lastName: user.lastName,
            emailId: user.emailId,
            age: user.age,
            gender: user.gender,
            skills: user.skills,
        });
    } catch (err) {
        console.error("Error saving user:", err);
        if (err.code === 11000) {
            res.status(400).json({ Error: "Email Already exists" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = await user.getToken();
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60 * 1000,
        }); // 8 hours
        res.json({
            message: "Login successful",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                age: user.age,
                gender: user.gender,
                skills: user.skills,
            },
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};

module.exports = { signup, login, logout };
