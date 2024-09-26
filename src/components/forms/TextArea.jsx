import React from "react";

const TextAreaField = ({ label, name, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        rows="4"
        required={required}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
