const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/stat", require("./routes/stat.routes"));
app.use("/api/dish", require("./routes/dish.routes"));

const PORT = config.get("port") || 5000;

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {});
        app.use(cors());
        app.listen(PORT, () =>
            console.log(`App has been started on port ${PORT}...`)
        );
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();
