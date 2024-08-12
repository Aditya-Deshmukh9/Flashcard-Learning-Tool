import React, { useState, useEffect } from "react";

const FlashcardForm = ({ onSubmit, initialData }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialData?.id, question, answer });
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full transition-colors"
        type="submit"
      >
        {initialData ? "Update Flashcard" : "Add Flashcard"}
      </button>
    </form>
  );
};

export default FlashcardForm;
