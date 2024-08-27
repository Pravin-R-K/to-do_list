import express from "express";
import cors from "cors";
import db from "./src/config/DbConnection.js";
import UserRouter from "./src/api/routers/UserRouter.js";
import TaskRouter from "./src/api/routers/TaskRouter.js";

const app = express();
const port = 5000;

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:5173"],
    })
);

app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/task", TaskRouter);

app.listen(port, () => {
    console.log(`Server is running in the Port ${port}.`);
});
