import express from "express";
import orderController from "../controller/orderController.js";

const router = express.Router();

router.post("/tao-don-hang", orderController.createOrder);
router.get("/toan-bo-don-hang", orderController.getAllOrder);

export default router;
