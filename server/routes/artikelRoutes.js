import express from "express";
import {
  getAllArtikel,
  createArtikel,
  updateArtikel,
  deleteArtikel
} from "../controllers/artikelControllers.js";

const router = express.Router();

router.get("/", getAllArtikel);
router.post("/", createArtikel);
router.put("/:id", updateArtikel);
router.delete("/:id", deleteArtikel);

export default router;
