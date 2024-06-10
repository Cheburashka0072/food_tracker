const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/stat", require("./routes/stat.routes"));
app.use("/api/dish", require("./routes/dish.routes"));

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected!");

        app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
    } catch (err) {
        console.error("Server Error", err.message);
        process.exit(1);
    }
};

start();

app.get("/", (req, res) => res.send("Express on Vercel"));

module.exports = app;
