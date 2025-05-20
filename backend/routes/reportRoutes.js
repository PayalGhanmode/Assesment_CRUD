import express from "express";
import { createReport, getReportsByUser, getAllReports } from "../controllers/reportController.js";

const reportRouter = express.Router();

reportRouter.post("/createreport", createReport);
reportRouter.get("/fetchreports/:id", getReportsByUser);
reportRouter.get("/getallreports", getAllReports);

export default reportRouter;