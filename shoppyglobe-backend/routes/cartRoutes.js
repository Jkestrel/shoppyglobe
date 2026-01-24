import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.put("/:id", protect, updateCartItem);
router.delete("/:id", protect, removeFromCart);

export default router;
