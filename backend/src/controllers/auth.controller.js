import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    });

    if(isUserAlreadyExists) {
        return res.status(409).json({
            success: false,
            message: "User with this username or email already exists.",
            err: "User already exists."
        });
    }

    const user = await userModel.create({
        username,
        email,
        password
    });

    const emailVerificationToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    const emailVerificationURL = `http://localhost:3000/api/auth/verifyEmail?token=${emailVerificationToken}`;

    const html = `
        <p>Hi ${username},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href=${emailVerificationURL}>Verify email</a>
        <p>If you did not create an account, Ignore this email.</p>
        <p>- The Perplexity Team</p>
    `;

    const result = await sendEmail({ to: user.email, subject: "Welcome to perplexity", html });
    
    res.status(201).json({
        success: true,
        message: "User registered",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

export async function verifyEmail(req, res) {
    const { token } = req.query;
    const loginURL = "http://localhost:3000/auth/api/login";

    if(!token) {
        return res.status(400).json({
            success: false,
            message: "Invalid token",
            err: "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email });

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token",
                err: "User not found"
            });
        }

        user.verified = true;
        await user.save();

        const html = `
            <h1>Your email has been successfully verified. ✅</h1>
            <p>You can now log in and start using Perplexity.</p>
            <a href="${loginURL}">Login to your account</a>
            <p>- The Perplexity Team</p>
        `;

        res.status(200).send(html);
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Invalid token",
            err: "Email verification failed: " + err.message
        });
    }
}

export async function loginUser(req, res) {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select("+password");

    if(!user) {
        return res.status(409).json({
            success: false,
            message: "Enter correct credentials",
            err: "Incorrect credentials"
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: "Enter correct credentials",
            err: "Incorrect credentials"
        });
    }

    if(!user.verified) {
        return res.status(400).json({
            success: false,
            message: "Please verify your email first",
            err: "Email not verified"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    
    res.cookie("token", token);

    res.status(200).json({
        success: true,
        message: "User logged-In",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

export async function getMe(req, res) {
    const userID = req.user.id;
    const user = await userModel.findById(userID);

    if(!user) {
        return res.status(409).json({
            success: false,
            message: "User not found",
            err: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "User fetched",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}