import express, { Router } from "express";
import {
  clearIdeas,
  savedIdeas,
  saveIdeas,
} from "../controller/ideasController";

const router: Router = express.Router();

// Save an idea
router.post("/save-idea", saveIdeas);

// Get all saved ideas
router.get("/saved-ideas", savedIdeas);

// Clear all saved ideas
router.post("/clear-ideas", clearIdeas);

export default router;
