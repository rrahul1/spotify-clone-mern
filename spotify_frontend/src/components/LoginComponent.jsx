import React, { useState } from "react";
import { Icon } from "@iconify/react";
import spotifyIcon from "@iconify-icons/logos/spotify";
import TextInput from "./shared-components/TextInput";
import PasswordInput from "./shared-components/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { unauthenticatedPostRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

const LoginComponent = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [cookie, setCookie] = useCookies(["token"]);

   const navigate = useNavigate();

   const resetForm = () => {
      setEmail("");
      setPassword("");
   };

   const handleLogin = async (e) => {
      e.preventDefault();

      if (!email || !password) {
         alert("All fields are required. Please fill in all fields!");
         return;
      }

      try {
         const data = {
            email,
            password,
         };
         const response = await unauthenticatedPostRequest("/auth/login", data);
         if (response) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 15);
            setCookie("token", token, { path: "/", expires: date });
            resetForm();
            navigate("/home");
         } else {
            console.error(
               "Sign-up failed:",
               response?.error || "Unknown error occurred"
            );
         }
      } catch (error) {
         console.error("Sign-up failed:", error.message);
      }
   };

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
               value={email}
               setValue={setEmail}
            />
            <PasswordInput
               label="Password"
               placeholder="Password"
               value={password}
               setValue={setPassword}
            />
            <div className=" w-full flex items-center justify-end my-8">
               <button
                  className="bg-green-400 font-semibold p-3 px-8 rounded-full"
                  onClick={handleLogin}
               >
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
