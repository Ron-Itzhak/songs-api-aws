import express, { Router, Request, Response } from "express";
import { getInsertJobStatus } from "../controllers/jobStatusController";
import { getInsertJobStatusDTO } from "../shared/Dto/JobStatusDTO";
import { validateDto } from "../middlewares/validationMiddleware";

const router: Router = express.Router();

router.get("/", validateDto(getInsertJobStatusDTO), getInsertJobStatus);

export default router;
