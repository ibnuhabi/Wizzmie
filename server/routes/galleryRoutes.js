import express from "express";
import {
  getAllGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri,
} from "../controllers/galleryControllers.js";  // PERHATIAN: "galleryControllers.js" bukan "galeriControllers.js"

const router = express.Router();

// READ
router.get("/", getAllGaleri);

// CREATE
router.post("/", createGaleri);

// UPDATE
router.put("/:id", updateGaleri);

// DELETE
router.delete("/:id", deleteGaleri);

export default router;