const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 50,
        required: [true, 'First Name is required'],
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 50,
        required: [true, 'Last Name is required'],
        trim: true
    },
    emailId: {
        type: String,
        required: [true, "Email address is required"],
        maxlength: 100,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    yearOfBirth: {
        type: Number,
        required: [true, 'Year of birth is required'],
        validate: {
            validator: function (year) {
                const currentYear = new Date().getFullYear();
                const age = currentYear - year;
                if (age <= 10) {
                    throw new Error("Age must be greater than 10");
                } else if (age > 80) {
                    throw new Error("Age cannot exceed 80 years");
                }
            }
        }
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: '{VALUE} is not supported'
        }
    },
    skills: {
        type: Array
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual("age").get(function () {
    if (!this.yearOfBirth) return undefined;
    const currentYear = new Date().getFullYear();
    return currentYear - this.yearOfBirth;
});

userSchema.methods.getToken = async function () {
    const user = this;
    return await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "8h",
    });
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}



const User = mongoose.model("User", userSchema);

module.exports = User;