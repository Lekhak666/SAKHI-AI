import express from "express";
import { createAssessment } from "../controllers/assessment.controller.js";

const router = express.Router();

router.post("/", createAssessment);

export default router;
