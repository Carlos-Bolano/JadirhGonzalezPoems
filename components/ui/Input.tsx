import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  name: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  className = "w-full font-cagliostro",
  ...inputProps
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block mb-1 font-bold text-lg ">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="border-2 border-Dark/50 focus:border-Dark py-2 px-3 w-full font-cagliostro placeholder:text-Dark/80"
        {...inputProps}
      />
    </div>
  );
};

export default Input;
