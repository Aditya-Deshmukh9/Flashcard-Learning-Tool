import React from "react";
import FlashcardList from "../components/FlashcardList";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-start pt-16 justify-center bg-gray-100">
      <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8">
          Flashcard Learning Tool
        </h1>
        <FlashcardList />
      </div>
    </div>
  );
};

export default HomePage;
