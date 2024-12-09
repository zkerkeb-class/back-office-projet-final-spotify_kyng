import React from "react";

const Label = ({ title, htmlFor }) => {
  return (
    <label className="block text-sm font-medium mb-2" htmlFor={htmlFor}>
      {title}
    </label>
  );
};

export default Label;
