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
                    message: "Неправильні реєстраційні дані",
                });
            }
            console.log(req.body);
            const { email, password } = req.body;
            const candidate = await User.findOne({ email: email });
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: "Цей користувач уже існує" });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: "Користувача створено успішно" });
        } catch (e) {
            res.status(500).json({
                message: "Щось пішло не так, повторіть спробу",
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
                    message: "Неправильні дані для входу",
                });
            }
            console.log(req.body);
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Користувача не знайдено" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Неправильний пароль, спробуйте ще раз" });
            }
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({
                message: "Щось пішло не так, повторіть спробу",
            });
        }
    }
);

module.exports = router;
