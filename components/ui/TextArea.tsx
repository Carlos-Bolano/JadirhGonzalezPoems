import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  name: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  name,
  rows = 3,
  className = "w-full font-cagliostro",
  ...textareaProps
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block mb-1 font-bold text-lg">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        rows={rows}
        className="border-2 border-Dark/60 focus:border-Dark py-2 px-3 w-full font-cagliostro placeholder:text-Dark/80"
        {...textareaProps}
      />
    </div>
  );
};

export default Textarea;
