import express from "express";
import productController from "../controller/productController.js";
import { isUserMiddleware } from "../middleware/isUserMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/tao-san-pham", productController.createProduct);
router.put(
  "/cap-nhap-san-pham/:id",
  authMiddleware,
  productController.updateProduct
);
router.get("/chi-tiet-san-pham/:id", productController.detailProduct);
router.get("/tat-ca-san-pham", productController.getAllProduct);
router.get("/tat-ca-san-pham/:type", productController.getAllProductType);
router.delete(
  "/xoa-san-pham/:id",
  authMiddleware,
  productController.deletePrpduct
);

export default router;
