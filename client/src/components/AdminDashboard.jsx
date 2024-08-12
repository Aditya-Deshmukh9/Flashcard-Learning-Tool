import React, { useState, useEffect } from "react";
import axios from "axios";
import FlashcardForm from "./FlashcardForm";

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PORT}/api/flashcards`)
      .then((response) => {
        setFlashcards(response.data);
      });
  }, []);

  const addFlashcard = (newFlashcard) => {
    axios
      .post(`${import.meta.env.VITE_PORT}/api/flashcards`, newFlashcard)
      .then(() => {
        setFlashcards([...flashcards, newFlashcard]);
      });
  };

  const editFlashcard = (updatedFlashcard) => {
    axios
      .put(
        `${import.meta.env.VITE_PORT}/api/flashcards/${updatedFlashcard.id}`,
        updatedFlashcard
      )
      .then(() => {
        setFlashcards(
          flashcards.map((card) =>
            card.id === updatedFlashcard.id ? updatedFlashcard : card
          )
        );
        setEditingCard(null);
      });
  };

  const deleteFlashcard = (id) => {
    axios
      .delete(`${import.meta.env.VITE_PORT}/api/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter((card) => card.id !== id));
      });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      {/* Flashcard Form for Adding or Editing */}
      <div className="mb-8">
        {editingCard ? (
          <FlashcardForm onSubmit={editFlashcard} initialData={editingCard} />
        ) : (
          <FlashcardForm onSubmit={addFlashcard} />
        )}
      </div>

      {/* Flashcard List */}
      <div className="grid grid-cols-1 gap-4">
        {flashcards.map((card) => (
          <div
            key={card.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div>
              <p className="font-semibold text-lg text-gray-900">
                {card.question}
              </p>
              <p className="text-gray-700 mt-1">{card.answer}</p>
              <div className="mt-3">
                {card.options.map((option, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    Option {index + 1}: {option}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => setEditingCard(card)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => deleteFlashcard(card.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
