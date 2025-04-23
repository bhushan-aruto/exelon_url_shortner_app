const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./interface/routes/auth_routes");
const urlRoutes = require("./interface/routes/url_routes");
const redirectRoutes = require("./interface/routes/redirect_routes");


dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.use("/r", redirectRoutes);

module.exports = app