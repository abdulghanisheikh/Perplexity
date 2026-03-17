import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        minLength: 6,
        maxLength: 12
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Mongoose middleware which hash password before saving it
userSchema.pre("save", async() => {
    if(!this.isModified("password")) return;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const userModel = mongoose.model("users", userSchema);
export default userModel;