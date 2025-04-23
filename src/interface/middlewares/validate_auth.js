const { body, validationResult } = require("express-validator");

const validateRegister = [
    body("email").isEmail().withMessage("email is invalid"),
    body("password").isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Send only the first error message
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];

const validateLogin = [
    body("email").isEmail().withMessage("email is invalid"),
    body("password").notEmpty().withMessage("password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];

module.exports = { validateRegister, validateLogin };
