const { Router } = require("express");
const Stat = require("../models/Stat");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/manipulate", auth, async (req, res) => {
    try {
        const { personMeals, water, timestamp } = req.body;

        // Delete the stat if no meals and water is zero
        if (personMeals.length === 0 && water === 0) {
            const deletedStat = await Stat.findOneAndDelete({ timestamp });
            if (deletedStat) {
                console.log("Deleted:", deletedStat);
                return res.status(200).json({
                    message: "Успішно видалено",
                });
            } else {
                console.log("No stat found to delete.");
                return res.status(404).json({
                    message: "No record found to delete",
                });
            }
        }

        let existStat = await Stat.findOne({ timestamp: req.body.timestamp });
        if (existStat) {
            await Stat.updateOne(
                { timestamp: req.body.timestamp },
                { personMeals: req.body.personMeals, meals: req.body.meals }
            );
            existStat.personMeals = req.body.personMeals;
            existStat.meals = req.body.meals;
            await existStat.save();
            return res
                .status(200)
                .json({ body: existStat, message: "Дані оновлено" });
        }

        const stat = new Stat({
            ...req.body,
            owner: req.user.userId,
        });
        await stat.save();
        res.status(201).json({ body: stat, message: "Дані додано" });
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong, try again",
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const stats = await Stat.find({ owner: req.user.userId });
        res.json(stats);
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong, try again",
        });
    }
});

module.exports = router;
