import express from "express";
import {
  getAllBooks,
  getbyidbook,
  postbook,
  updatebook,
  deletebook,
} from "../Controller/bookController";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getbyidbook);
router.post("/", postbook);
router.put("/:id", updatebook);
router.delete("/:id", deletebook);

export default router;
