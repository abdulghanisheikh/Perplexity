import jwt from "jsonwebtoken";
import "dotenv/config";
import {redis} from "../configs/cache.config.js";

export const authUser = async(req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "No token found, unauthorized user",
            err: "Invalid token"
        });
    }

    let isTokenBlacklisted;
    try {
        isTokenBlacklisted = await redis.get(token);
    } catch(err) {
        return res.status(401).json({
            success: false,
            message: "Token access error in redis",
            error: err.message
        });
    }

    // Blacklisted token => user already logged out
    if(isTokenBlacklisted) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
            err: "Blacklisted token"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "User authentication failed",
            err: "Token verification error: " + err.message
        });
    }
}