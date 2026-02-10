import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri,
} from "../controllers/galleryControllers.js";

const router = express.Router();

router.get("/", getAllGaleri);
router.post("/", upload.single("gambar"), createGaleri);
router.put("/:id", upload.single("gambar"), updateGaleri);
router.delete("/:id", deleteGaleri);

export default router;
