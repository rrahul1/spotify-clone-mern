import React from "react";

function TextInput({ label, placeholder }) {
   return (
      <div className="passwordInputDiv flex flex-col space-y-4 w-full">
         <label htmlFor={label} className="font-semibold">
            {label}
         </label>
         <input
            type="password"
            placeholder={placeholder}
            className=" border border-gray-400 border-solid rounded placeholder-gray-500 p-3"
            id={label}
         />
      </div>
   );
}

export default TextInput;
