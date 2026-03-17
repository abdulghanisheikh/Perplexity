import userModel from "../models/user.model.js";

export const registerUser = async(req, res) => {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
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

    // Verify email
}