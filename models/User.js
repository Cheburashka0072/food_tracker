const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profile: { type: Object, require: false },
    stats: [{ type: Types.ObjectId, ref: "Stat" }],
});
module.export = model("User", schema);
