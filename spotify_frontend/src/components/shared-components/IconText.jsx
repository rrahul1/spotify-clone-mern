import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, to, active, handleNavClick }) => {
   const handleClick = (event) => {
      event.preventDefault(); // Prevents the default navigation behavior

      handleNavClick(to); // Update the activeComponent state
   };
   return (
      <Link
         to={to}
         onClick={handleClick}
         className={`nav-item ${
            active ? "active" : ""
         } flex items-center justify-start cursor-pointer`}
      >
         <div className="px-5 py-2 ">
            <Icon
               icon={iconName}
               color={active ? "white" : "gray"}
               fontSize={30}
            />
         </div>
         <div
            className={`${
               active ? "text-white" : "text-gray-400"
            } text-sm font-semibold hover:text-white`}
         >
            {displayText}
         </div>
      </Link>
   );
};

export default IconText;
