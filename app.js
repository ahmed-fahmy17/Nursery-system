const express = require('express');
const server = express();
const morgan = require("morgan");
require("dotenv").config();
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");

const teacherRoute = require("./routes/teacherRoute");
const childRoute = require("./routes/childRoute");
const classRoute = require("./routes/classRoute");
const port = process.env.port || 8080;
const Database = process.env.DB_URL || "mongodb://127.0.0.1:27017/Nursery_database";

mongoose
    .connect(Database)
    .then(() => {
        console.log("Connected to the database");
        server.listen(port, () => {
            console.log("listening to port 8080");
        });
    })
    .catch((error) => {
        console.log("Error connecting to the database", error);
    });
server.use(cors());
server.use(morgan(":method :url"));
server.use(express.json());

server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

server.use((request, response, next) => {
    response.status(404).json({ message: "Not Found" });
});

// Error middleware
server.use((error, request, response, next) => {
    const statusCode = error.status || 500;
    response.status(statusCode).json({ message: error + "" });
});

