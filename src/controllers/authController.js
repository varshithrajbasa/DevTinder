const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, age, gender, skills } = req.body;
        const requiredFields = ['firstName', 'lastName', 'emailId', 'password', 'age', 'gender'];
        if (!validation(req.body, requiredFields)) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = new User({
            firstName,
            lastName,
            emailId,
            password,
            age,
            gender,
            skills
        });
        bcrypt.hash(user.password, process.env.SALT_ROUNDS, async (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            user.password = hashedPassword;
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error("Error saving user:", err);
        if(err.code === 11000) {
            res.status(400).json({Error: "Email Already exists"});
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { signup };