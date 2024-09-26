import React from "react";

const SubmitButton = ({ text, color, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full mt-3 ${color} text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
