require("dotenv").config();

const connectDB = require("./config/database");

const express = require("express");
const app = express();
app.use(express.json());

const User = require("./models/user");

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, gender } = req.body;
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            age,
            gender,
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/users", async (req, res) => {
    const data = await User.find();
    res.json(data);
});

connectDB()
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
