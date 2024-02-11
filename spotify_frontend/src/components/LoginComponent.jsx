import React from "react";
import { Icon } from "@iconify/react";
import spotifyIcon from "@iconify-icons/logos/spotify";

const LoginComponent = () => {
   return (
      <div className="size-full flex flex-col items-center">
         <div className="logo p-6 border-b border-solid border-gray-300 w-full flex justify-center">
            <Icon icon={spotifyIcon} width={150} />
         </div>
      </div>
   );
};

export default LoginComponent;
