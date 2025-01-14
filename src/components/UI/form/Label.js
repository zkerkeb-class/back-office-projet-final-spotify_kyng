import React from "react";

const Label = ({ title, htmlFor, isRequired }) => {
  return (
    <label className="block text-sm font-medium mb-2" htmlFor={htmlFor}>
      {title} {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
