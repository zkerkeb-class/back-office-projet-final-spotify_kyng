import React from 'react';
import Label from './Label';
import { Radio, RadioGroup, Field } from '@headlessui/react';

const CustomRadioGroup = ({ options, value, onChange, label, name }) => {
  return (
    <>
      <Label htmlFor={name} title={label}/>
      <RadioGroup
        value={value||options[0]}
        onChange={(val)=> onChange(val)}
        aria-label="Server size"
        className="flex gap-4"
      >
        {options.map((option) => 
            (
          <Field
            key={option}
            className="flex items-center gap-2"
          >
            <Radio
              value={option}
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <span>{option}</span>
          </Field>
        ))}
      </RadioGroup>
    </>
  );
};

export default CustomRadioGroup;
