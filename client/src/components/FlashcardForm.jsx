import React, { useState, useEffect } from "react";

const FlashcardForm = ({ onSubmit, initialData }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
      setOptions(initialData.options);
    }
  }, [initialData]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialData?.id, question, answer, options });
    setQuestion("");
    setAnswer("");
    setOptions(["", "", "", ""]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
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
