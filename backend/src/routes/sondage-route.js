import express from "express";

import { vote, getResults, getOptions } from "../controllers/sondage-controller.js";
import protectRoute from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/vote", protectRoute, vote);
router.get("/get-results", protectRoute, getResults);
router.get("/get-options", protectRoute, getOptions);

export default router;
