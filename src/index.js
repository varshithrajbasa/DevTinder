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

//GET all users
app.get("/users", async (req, res) => {
    try {
    const data = await User.find();
        res.json(data);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get User by id
app.get("/user/:id", async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(data);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
