import express from "express";
import {
  getAllEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsControllers.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// READ
router.get("/", getAllEvent);

// CREATE (pakai upload gambar)
router.post("/", upload.single("gambar"), createEvent);

// UPDATE (pakai upload gambar)
router.put("/:id", upload.single("gambar"), updateEvent);

// DELETE
router.delete("/:id", deleteEvent);

export default router;
