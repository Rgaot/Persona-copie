import express from "express";

import protectRoute from "../middlewares/auth-middleware.js";
import { sendMessage, getMessage } from "../controllers/message-controller.js";

const router = express.Router();

router.post("/send", protectRoute, sendMessage);
router.get("/get", protectRoute, getMessage);

export default router;
