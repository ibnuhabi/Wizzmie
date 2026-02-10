import express from "express";
import {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnersControllers.js";
import upload from "../middlewares/upload.js"; // ⬅️ WAJIB

const router = express.Router();

router.get("/", getAllPartners);
router.post("/", upload.single("logo"), createPartner);      // ⬅️ logo
router.put("/:id", upload.single("logo"), updatePartner);   // ⬅️ logo
router.delete("/:id", deletePartner);

export default router;
