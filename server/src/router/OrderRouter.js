import express from "express";
import orderController from "../controller/orderController.js";

const router = express.Router();

router.post("/tao-don-hang", orderController.createOrder);

export default router;
