import express from "express";
import { sendOTP, verifyOTP } from "../controller/controller.js";


const router = express.Router();

router.post("/vegies/v1/api/sendOTP", sendOTP);
router.post("/vegies/v1/api/verifyOTP", verifyOTP);

export default router;