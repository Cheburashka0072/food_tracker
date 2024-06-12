const { Router } = require("express");
const Profile = require("../models/Profile");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
    try {
        const profile = new Profile({
            ...req.body,
            owner: req.user.userId,
        });
        await profile.save();
        res.status(201).json({ profile });
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});

router.put("/edit", auth, async (req, res) => {
    try {
        await Profile.findOneAndUpdate(
            {
                owner: req.user.userId,
            },
            { ...req.body }
        );
        res.status(201).json({ message: "Профіль успішно оновлено" });
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const profile = await Profile.find({ owner: req.user.userId });
        res.json(profile);
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});

module.exports = router;
