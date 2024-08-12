import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import flashcardRoutes from "./routes/flashcards.js";
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/flashcards", flashcardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
