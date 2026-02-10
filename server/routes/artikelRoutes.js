import express from "express";
import { getAllArtikel, createArtikel, updateArtikel, deleteArtikel } from "../controllers/artikelControllers.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllArtikel);
router.post("/", upload.single("thumbnail"), createArtikel);
router.put("/:id", upload.single("thumbnail"), updateArtikel);
router.delete("/:id", deleteArtikel);

export default router;
