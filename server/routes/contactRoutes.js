import express from "express";
import {
  createContact,
  getAllContacts,
  replyContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.post("/reply", replyContact);

export default router;
