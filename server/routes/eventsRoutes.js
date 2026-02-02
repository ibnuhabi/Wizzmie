import express from "express";
import {
  getAllEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsControllers.js";

const router = express.Router();

// READ
router.get("/", getAllEvent);

// CREATE
router.post("/", createEvent);

// UPDATE
router.put("/:id", updateEvent);

// DELETE
router.delete("/:id", deleteEvent);

export default router;