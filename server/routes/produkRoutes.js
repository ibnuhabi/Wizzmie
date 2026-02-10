import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllProduk,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/produkControllers.js";

const router = express.Router();

router.get("/", getAllProduk);
router.post("/", upload.single("image"), createProduk);
router.put("/:id", upload.single("image"), updateProduk);
router.delete("/:id", deleteProduk);

export default router;
