import React from "react";

function TextInput({ label, placeholder, className, value, setValue }) {
   return (
      <div
         className={`textInputDiv flex flex-col space-y-4 w-full ${className}`}
      >
         <label htmlFor={label} className="font-semibold text-white">
            {label}
         </label>
         <input
            type="text"
            placeholder={placeholder}
            className=" border border-gray-400 border-solid rounded placeholder-gray-500 p-3"
            id={label}
            value={value}
            onChange={(e) => {
               setValue(e.target.value);
            }}
         />
      </div>
   );
}

export default TextInput;
