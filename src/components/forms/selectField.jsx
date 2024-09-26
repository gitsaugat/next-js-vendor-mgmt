import React from "react";

const SelectField = ({
  label,
  name,
  value,
  setState,
  onChange,
  options,
  required,
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}
        className="block float-left font-bold text-sm text-gray-700  mb-2 mt-2"
      >
        {label}:
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => setState(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

// options example
// const roleOptions = [
//     { label: 'Select Role', value: '' },
//     { label: 'Admin', value: 'admin' },
//     { label: 'User', value: 'user' },
//     { label: 'Guest', value: 'guest' },
//   ];
