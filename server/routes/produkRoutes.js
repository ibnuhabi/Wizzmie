import express from "express";
import uploadProduk from "../middlewares/uploadProduk.js";
import {
  getAllProduk,
  getProdukById,    // ✅ Import fungsi baru
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/produkControllers.js";

const router = express.Router();

router.get("/", getAllProduk);
router.get("/:id", getProdukById);    // ✅ Route untuk get by ID
router.post("/", uploadProduk.single("image"), createProduk);
router.put("/:id", uploadProduk.single("image"), updateProduk);
router.delete("/:id", deleteProduk);

export default router;