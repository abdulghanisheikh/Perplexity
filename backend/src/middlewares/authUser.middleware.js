import jwt from "jsonwebtoken";
import "dotenv/config";

export async function authUser(req, res, next) {
    const { token } = req.cookies;

    if(!token) {
        return res.status(409).json({
            success: false,
            message: "No token found, unauthorized user",
            err: "Invalid token"
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