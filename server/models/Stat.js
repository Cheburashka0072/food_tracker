const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
    timestamp: { type: Number, required: true },
    meals: { type: Array, required: true },
    personMeals: { type: Array, required: true },
    water: { type: Number, required: true },
    BMR: { type: Number, required: true },
    owner: { type: Types.ObjectId, ref: "User" },
});
module.exports = model("Stat", schema);
