const { Router } = require("express");
const Dish = require("../models/Dish");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
    try {
        const dish = new Dish({
            ...req.body,
            owner: req.user.userId,
        });
        await dish.save();
        res.status(200).json({ body: dish, message: "Продукт додано" });
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});
router.post("/defCreate", auth, async (req, res) => {
    try {
        console.log(req.body);
        const dish = new Dish(req.body);
        await dish.save();
        res.status(200).json({ body: dish, message: "Дані додано" });
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});

router.post("/delete", auth, async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedDish = await Dish.findOneAndDelete({ _id });
        res.status(200).json({
            body: deletedDish,
            message: "Продукт видалено",
        });
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});

router.put("/edit", auth, async (req, res) => {
    try {
        const { _id } = req.body;
        await Dish.findOneAndUpdate(
            { _id },
            {
                name: req.body.name,
                calories: req.body.calories,
                carbohydrates: req.body.carbohydrates,
                proteins: req.body.proteins,
                fats: req.body.fats,
            }
        );

        return res.status(200).json({ message: "Продукт оновлено" });
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const dishes = await Dish.find({ owner: req.user.userId });
        res.json(dishes);
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});
router.get("/defaultDishes", auth, async (req, res) => {
    try {
        const dishes = await Dish.find({ owner: null });
        res.json(dishes);
    } catch (e) {
        res.status(500).json({
            message: "Щось пішло не так, повторіть спробу",
        });
    }
});

module.exports = router;
