import express from "express";
import { sendOTP, verifyOTP,insertProducts, fetchProducts, updateProducts } from "../controller/controller.js";


const router = express.Router();

router.post("/vegies/v1/api/sendOTP", sendOTP);
router.post("/vegies/v1/api/verifyOTP", verifyOTP);
router.post("/vegies/v1/api/products", insertProducts);
router.get("/vegies/v1/api/products", fetchProducts);
router.put("/vegies/v1/api/products/:id", updateProducts);


export default router;