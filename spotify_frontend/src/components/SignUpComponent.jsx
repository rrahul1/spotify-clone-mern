import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import spotifyIcon from "@iconify-icons/logos/spotify";
import TextInput from "./shared-components/TextInput";
import PasswordInput from "./shared-components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { unauthenticatedPostRequest } from "../utils/serverHelpers";

const SignUpComponent = () => {
   const [email, setEmail] = useState("");
   const [confirmEmail, setConfirmEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [cookie, setCookie] = useCookies(["token"]);
   const navigate = useNavigate();

   const resetForm = () => {
      setEmail("");
      setConfirmEmail("");
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
   };

   const handleSignUp = async (e) => {
      e.preventDefault();

      if (
         !email ||
         !confirmEmail ||
         !password ||
         !username ||
         !firstName ||
         !lastName
      ) {
         alert("All fields are required. Please fill in all fields!");
         return;
      }

      if (email !== confirmEmail) {
         alert("Email and confirm email do not match. Please check again!");
         return;
      }

      try {
         const data = {
            email,
            password,
            username,
            firstname: firstName,
            lastname: lastName,
         };
         const response = await unauthenticatedPostRequest(
            "/auth/register",
            data
         );
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
            <div className="font-bold text-2xl mb-6">
               Sign up for free to start listening
            </div>
            <TextInput
               label="Enter your email"
               placeholder="Enter your Email address"
               className="mb-6"
               value={email}
               setValue={setEmail}
            />
            <TextInput
               label="Confirm Email"
               placeholder="Enter your email again to confirm"
               className="mb-6"
               value={confirmEmail}
               setValue={setConfirmEmail}
            />
            <TextInput
               label="Username"
               placeholder="Enter your Username"
               className="mb-6"
               value={username}
               setValue={setUsername}
            />
            <PasswordInput
               label="Create a password"
               placeholder="Create a strong password"
               value={password}
               setValue={setPassword}
            />
            <div className="w-full flex justify-between items-center space-x-8">
               <TextInput
                  label="First Name"
                  placeholder="Enter your First name"
                  className="my-6"
                  value={firstName}
                  setValue={setFirstName}
               />
               <TextInput
                  label="Last Name"
                  placeholder="Enter your Last name"
                  className="my-6"
                  value={lastName}
                  setValue={setLastName}
               />
            </div>

            <div className=" w-full flex items-center justify-center my-8">
               <button
                  className="bg-green-400 font-semibold p-3 px-8 rounded-full"
                  onClick={handleSignUp}
               >
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
