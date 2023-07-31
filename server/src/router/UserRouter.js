import express from "express";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isUserMiddleware } from "../middleware/isUserMiddleware.js";
const router = express.Router();

router.put("/:id", userController.updateUser);
router.delete("/xoa-nguoi-dung/:id", authMiddleware, userController.deleteUser);
router.get(
  "/thong-tin-nguoi-dung/:id",
  isUserMiddleware,
  userController.getOneUser
);
router.post("/refresh-token", userController.refreshToken);
router.get("/", authMiddleware, userController.getAllUser);

export default router;
