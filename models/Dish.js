const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    proteins: { type: Number, required: true },
    fats: { type: Number, required: true },
    owner: { type: Types.ObjectId, ref: "User" },
});
module.exports = model("Dish", schema);
