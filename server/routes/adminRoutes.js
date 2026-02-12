import express from "express";
import { loginAdmin } from "../controllers/adminControllers.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);

// Contoh route yang dilindungi
router.get("/admin/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Dashboard aman",
    user: req.user
  });
});

export default router;
