import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
    const { username, email, password } = req.body;
     
}