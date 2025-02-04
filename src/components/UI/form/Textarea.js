import React from "react";
import Label from "./Label";

const Textarea = ({ label, id, onChange, placeholder, ...props }) => {
  return (
    <div>
      <Label title={label} htmlFor={id} />
      <textarea
        id={id}
        className="border rounded-md px-3 py-2 w-full min-h-40"
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Textarea;
