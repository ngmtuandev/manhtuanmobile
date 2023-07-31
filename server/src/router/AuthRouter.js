import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.post("/dang-ky", authController.register);
router.post("/dang-nhap", authController.login);

export default router;
