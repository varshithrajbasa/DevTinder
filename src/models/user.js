const mongoose = require("mongoose");

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
        minlength: 6,
        maxlength: 30,
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
         validate : {
            validator: function(val) {
                if(!["Male", "Female", "Other"].includes(val)){
                    throw new Error("Invalid Gender");
                }
            }
        }
    },
    skills: {
        type: Array
    }
}, {
    timestamps: true,
});

const User= mongoose.model("User", userSchema);

module.exports = User;