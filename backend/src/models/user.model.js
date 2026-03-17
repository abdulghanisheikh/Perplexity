import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username should be unique."],
        required: [true, "username is required."]
    },
    email: {
        type: String,
        unique: [true, "email should be unique."],
        required: [true, "email is required."],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required."],
        minLength: 6
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

export default userModel;