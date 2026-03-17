import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        return next();
    }

    res.status(400).json({
        errors: errors.array()
    });
}

export const registerValidation = [
    body("username").isString().withMessage("Username should be string."),
    body("email").isEmail().withMessage("Email should be in correct email address format."),
    body("password").isLength({ min: 6, max: 12 }).withMessage("Password length should be in between 6 to 12 characters"),
    validate
];