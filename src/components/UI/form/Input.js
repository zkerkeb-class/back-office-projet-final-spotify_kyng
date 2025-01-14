import React from "react";
import Label from "./Label";

const Input = ({ label, type, id, onChange, placeholder, value,required, ...props }) => {
  return (
    <div className="grid">
      <Label title={label} htmlFor={id} isRequired={required} />
      <input
        {...props}
        id={id}
        type={type}
        className={`border rounded-md px-3 py-2  ${
          type === "checkbox" ? "h-4 w-4" : "w-full"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
