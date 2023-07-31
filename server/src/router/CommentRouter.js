import express from "express";
import commentController from "../controller/commentController.js";

const router = express.Router();

router.post("/tao-binh-luan", commentController.createComment);
router.get(
  "/tat-ca-binh-luan-san-pham/:product",
  commentController.getCommentProduct
);

export default router;
