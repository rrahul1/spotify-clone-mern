import React from "react";
import { Icon } from "@iconify/react";
import spotifyIcon from "@iconify-icons/logos/spotify";
import TextInput from "./shared-components/TextInput";
import PasswordInput from "./shared-components/PasswordInput";
import { Link } from "react-router-dom";

const SignUpComponent = () => {
   return (
      <div className="size-full flex flex-col items-center">
         <div className="logo p-6 border-b border-solid border-gray-300 w-full flex justify-center">
            <Icon icon={spotifyIcon} width={150} />
         </div>
         <div className="inputLogin w-1/3 py-10 flex items-center justify-center flex-col">
            <div className="font-bold text-2xl mb-6">
               Sign up for free to start listening
            </div>
            <TextInput
               label="Enter your email"
               placeholder="Email address or username"
               className="mb-6"
            />
            <TextInput
               label="Confirm Email"
               placeholder="Enter your email again"
               className="mb-6"
            />
            <PasswordInput
               label="Create a password"
               placeholder="Create a strong password"
            />
            <TextInput
               label="What should we call you?"
               placeholder="Enter your profile name"
               className="my-6"
            />
            <div className=" w-full flex items-center justify-center my-8">
               <button className="bg-green-400 font-semibold p-3 px-8 rounded-full">
                  SIGN UP
               </button>
            </div>
            <div className="border-b border-solid border-gray-300 w-full "></div>
            <div className="my-6 font-semibold text-xl">Have an account?</div>
            <div className="border border-gray-500 text-gray-400 font-bold w-full flex items-center justify-center py-4 rounded-full">
               <Link to="/login">LOG IN INSTEAD</Link>
            </div>
         </div>
      </div>
   );
};

export default SignUpComponent;
