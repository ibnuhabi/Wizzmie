import express from "express";
import {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnersControllers.js";

const router = express.Router();

router.get("/", getAllPartners);
router.post("/", createPartner);
router.put("/:id", updatePartner);
router.delete("/:id", deletePartner);

export default router;