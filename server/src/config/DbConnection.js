import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/DataDen");

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Database Connected!");
});

db.on("error", () => {
    console.log("Error occured during Database Connection");
});

export default db;
