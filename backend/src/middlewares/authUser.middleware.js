import jwt from "jsonwebtoken";
import "dotenv/config";

export const authUser = async(req, res, next) => {
    const token = req.cookies.token;
    try {
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "No token found, unauthorized user",
                err: "Invalid token"
            });
        }

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