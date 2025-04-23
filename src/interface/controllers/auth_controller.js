const User = require("../../domain/entities/user")
const { hashPassword, comparePassword } = require("../../infrastructure/utils/password_hash")
const { generateToken } = require("../../infrastructure/utils/jwt")

const userRegisterController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await User.findOne({ email: email });
        if (existing) {
            return res.status(400).json({ message: "email already registered" })
        }

        const hashedPassword = await hashPassword(password);
        await User.create({ email: email, password: hashedPassword });

        res.status(201).json({ message: "user registered successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "insternal server errorr occurred" })
    }
}

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        const isPasswordMatched = await comparePassword(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "incorrect password" });
        }

        const token = generateToken({ id: user._id, email: user.email });
        if (!token) {
            return res.status(500).json({ message: "error occurred while generating user token" })
        }
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "insternal server errorr occurred" })
    }
}


module.exports = { userRegisterController, userLoginController };

