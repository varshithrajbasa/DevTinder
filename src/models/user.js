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
    age: {
        type: Number,
        required: [true, 'Age is required'],
        validate : {
            validator: function(age) {
                if(age < 18){
                    throw new Error("Should be greater than 18 years")
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
});

userSchema.methods.getToken = async function() {
    const user = this;
    return await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "8h",
    });
}

userSchema.methods.validatePassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}



const User= mongoose.model("User", userSchema);

module.exports = User;