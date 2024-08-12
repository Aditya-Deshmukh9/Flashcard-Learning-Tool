import express from "express";
import db from "../db/db.js";

const router = express.Router();

// Insert flashcard with options stored as JSON
router.post("/add-flashcard", (req, res) => {
  const { question, options, answer } = req.body;
  const optionsJSON = JSON.stringify(options); // Convert options array to JSON string

  db.query(
    "INSERT INTO flashcards (question, options, answer) VALUES (?, ?, ?)",
    [question, optionsJSON, answer],
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
    // Parse the options JSON string back to an array
    const flashcards = results.map((flashcard) => {
      try {
        return {
          ...flashcard,
          options: JSON.parse(flashcard.options), // Parse the JSON string
        };
      } catch (error) {
        console.error("Error parsing options:", error);
        return flashcard;
      }
    });
    res.json(flashcards);
  });
});

// GET /api/flashcards/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM flashcards WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({
        ...result[0],
        options: JSON.parse(result[0].options),
      });
    } else {
      res.status(404).json({ message: "Flashcard not found" });
    }
  });
});

// PUT /api/flashcards/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { question, options, answer } = req.body;
  const optionsJSON = JSON.stringify(options);
  db.query(
    "UPDATE flashcards SET question = ?, options = ?, answer = ? WHERE id = ?",
    [question, optionsJSON, answer, id],
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

// POST /api/flashcards/bulk
router.post("/bulk", (req, res) => {
  const flashcards = req.body;

  // Prepare the data for bulk insertion
  const values = flashcards.map(({ question, options, answer }) => [
    question,
    JSON.stringify(options),
    answer,
  ]);

  const query = "INSERT INTO flashcards (question, options, answer) VALUES ?";

  db.query(query, [values], (err, result) => {
    if (err) throw err;
    res.json({
      message: "Flashcards added successfully",
      affectedRows: result.affectedRows,
    });
  });
});

export default router;
