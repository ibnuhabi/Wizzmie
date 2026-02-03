import express from "express";
import {
  getAllProduk,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/produkControllers.js";

const router = express.Router();

router.get("/products", getAllProduk);
router.post("/products", createProduk);
router.put("/products/:id", updateProduk);
router.delete("/products/:id", deleteProduk);

export default router;
