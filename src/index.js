require("dotenv").config();

const connectDB = require("./config/database");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/api/status", (req, res) => {
    res.send("API is running");
});

app.use("/auth", authRoutes);
app.use(authMiddleware);
app.use("/profile", userRoutes);

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
