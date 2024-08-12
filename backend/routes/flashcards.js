import express from "express";
import db from "../db/db.js";

const router = express.Router();

// POST /api/flashcards/add-flashcard
router.post("/add-flashcard", (req, res) => {
  const { question, answer } = req.body;

  db.query(
    "INSERT INTO flashcards (question, answer) VALUES (?, ?)",
    [question, answer],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Flashcard added successfully" });
    }
  );
});

// GET /api/flashcards
router.get("/", (req, res) => {
  db.query("SELECT * FROM flashcards", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// GET /api/flashcards/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM flashcards WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Flashcard not found" });
    }
  });
});

// PUT /api/flashcards/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  db.query(
    "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
    [question, answer, id],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({ message: "Flashcard updated successfully" });
      } else {
        res.status(404).json({ message: "Flashcard not found" });
      }
    }
  );
});

// DELETE /api/flashcards/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM flashcards WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ message: "Flashcard deleted successfully" });
    } else {
      res.status(404).json({ message: "Flashcard not found" });
    }
  });
});

export default router;
