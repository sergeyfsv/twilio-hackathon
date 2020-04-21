import express from "express";
import SmsHandler from "../controllers/sms-controller";
import { asyncRoute } from "./async-route";

const router = express.Router();
router.post("", asyncRoute(SmsHandler));

export default router;
