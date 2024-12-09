'use client';
import React, { useState } from 'react';

const Select = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState([]);

  const toggleOption = (option) => {
    if (selectedOption.includes(option)) {
      setSelectedOption(selectedOption.filter((o) => o !== option));
      onChange(
        selectedOption.filter((o) => o !== option)
      )
    } else {
      setSelectedOption([...selectedOption, option]);
      onChange(
        selectedOption.includes(option)
          ? selectedOption.filter((o) => o !== option)
          : [...selectedOption, option]
      )
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div
          key={index}
          className={`px-3 py-1 rounded-full inline-flex items-center space-x-2 cursor-pointer transition-colors ${
            selectedOption.includes(option)
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => toggleOption(option)}
        >
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default Select;
