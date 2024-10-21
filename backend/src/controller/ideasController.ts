import { Request, Response } from "express";
import db from "../database";

const saveIdeas = (req: Request, res: Response) => {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "Idea is required" });
  }

  db.run("INSERT INTO ideas (idea) VALUES (?)", [idea], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to save idea" });
    }

    res.status(200).json({ id: this.lastID, idea });
  });
};

const savedIdeas = (req: Request, res: Response) => {
  db.all("SELECT * FROM ideas", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch ideas" });
    }

    res.status(200).json(rows);
  });
};

const clearIdeas = (req: Request, res: Response) => {
  db.run("DELETE FROM ideas", (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to clear ideas" });
    }

    res.status(200).json({ message: "All ideas cleared" });
  });
};

export { saveIdeas, savedIdeas, clearIdeas };
