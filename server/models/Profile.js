const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    activity: { type: Number, default: 1.2 },
    BMR: { type: Number, required: true },
    owner: { type: Types.ObjectId, ref: "User" },
});
module.exports = model("Profile", schema);
