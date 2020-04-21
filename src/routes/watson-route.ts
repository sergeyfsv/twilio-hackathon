import express from "express";
import WatsonHandler from "../controllers/watson-controller";
import { asyncRoute } from "./async-route";

const router = express.Router();
router.post("", asyncRoute(WatsonHandler));

export default router;
