import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  setState,
  onChange,
  required,
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}
        className="block float-left text-sm font-bold  text-gray-700 mb-2 mt-2"
      >
        {label}:
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
      />
    </div>
  );
};

export default InputField;
