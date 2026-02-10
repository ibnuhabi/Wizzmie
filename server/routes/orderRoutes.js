import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrderStats,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.post('/', createOrder);

// GET all orders with pagination & filters
router.get("/", getAllOrders);

// GET order statistics (MUST be before /:id)
router.get("/stats/overview", getOrderStats);

// GET single order by ID
router.get("/:id", getOrderById);

// PATCH update order status
router.patch("/:id/status", updateOrderStatus);

// DELETE order
router.delete("/:id", deleteOrder);

export default router;  