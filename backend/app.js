import express from "express";
import cors from "cors";
import path from 'path';
import reportRouter from "./routes/reportRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", reportRouter);

export default app;
