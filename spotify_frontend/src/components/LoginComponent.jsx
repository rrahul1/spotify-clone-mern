import React from "react";
import { Icon } from "@iconify/react";
import spotifyIcon from "@iconify-icons/logos/spotify";
import TextInput from "./shared-components/TextInput";
import PasswordInput from "./shared-components/TextInput";
import { Link } from "react-router-dom";

const LoginComponent = () => {
   return (
      <div className="size-full flex flex-col items-center">
         <div className="logo p-6 border-b border-solid border-gray-300 w-full flex justify-center">
            <Icon icon={spotifyIcon} width={150} />
         </div>
         <div className="inputLogin w-1/3 py-10 flex items-center justify-center flex-col">
            <div className="font-bold mb-6">To continue, login to spotify</div>
            <TextInput
               label="Email address or username"
               placeholder="Email address or username"
               className="my-6"
            />
            <PasswordInput label="Password" placeholder="Password" />
            <div className=" w-full flex items-center justify-end my-8">
               <button className="bg-green-400 font-semibold p-3 px-8 rounded-full">
                  LOG IN
               </button>
            </div>
            <div className="border-b border-solid border-gray-300 w-full "></div>
            <div className="my-6 font-semibold text-xl">
               Don't have an account?
            </div>
            <div className="border border-gray-500 text-gray-400 font-bold w-full flex items-center justify-center py-4 rounded-full">
               <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
            </div>
         </div>
      </div>
   );
};

export default LoginComponent;
