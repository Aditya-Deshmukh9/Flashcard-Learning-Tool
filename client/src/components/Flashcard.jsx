import React, { useState } from "react";

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div
      className={`flashcard-container ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flashcard-content">
        <div className="flashcard-front p-4">
          <div className="text-center font-bold text-xl mb-4">{question}</div>
        </div>
        <div className="flashcard-back p-4">
          <div className="text-center font-bold text-xl">Answer:</div>
          <div className="text-center mt-4 text-blue-900">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
