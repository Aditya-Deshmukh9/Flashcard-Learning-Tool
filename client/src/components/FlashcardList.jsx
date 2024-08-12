import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PORT}/api/flashcards`)
      .then((response) => {
        setFlashcards(response.data);
      });
  }, []);

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {flashcards.length > 0 && (
        <Flashcard
          question={flashcards[currentIndex].question}
          answer={flashcards[currentIndex].answer}
        />
      )}
      <div className="mt-4 flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={prevCard}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={nextCard}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;
