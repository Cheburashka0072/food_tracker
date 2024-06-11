const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.get("/register", async (req, res) => {
    return res.status(200).json({ message: "i did it!" });
});

router.post(
    "/register",
    [
        check("email", "Incorrect email").isEmail(),
        check(
            "password",
            "Password must be minimum 6 characters long"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong registration data",
                });
            }
            console.log(req.body);
            const { email, password } = req.body;
            const candidate = await User.findOne({ email: email });
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: "This user already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: "User created successfully" });
        } catch (e) {
            res.status(500).json({
                message: "Something went wrong, try again",
            });
        }
    }
);

router.post(
    "/login",
    [
        check("email", "Type correct email").isEmail(),
        check("password", "Type password").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong login data",
                });
            }
            console.log(req.body);
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Wrond password, try again" });
            }
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({
                message: "Something went wrong, try again",
            });
        }
    }
);

module.exports = router;
