import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import spotifyLogo from "../assets/spotify_logo_white.svg";
import IconText from "./shared-components/IconText";
import NavButton from "./shared-components/NavButton";
import TextInput from "./shared-components/TextInput";

const UploadSong = () => {
   return (
      <div className="size-full flex">
         <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
            <div>
               <div className="logoDiv p-6 ">
                  <img src={spotifyLogo} alt="spotify logo" width={140} />
               </div>
               <div className="py-5">
                  <IconText
                     iconName="material-symbols:home"
                     displayText="Home "
                     active
                  />
                  <IconText
                     iconName="ic:baseline-search"
                     displayText="Search "
                  />

                  <IconText iconName="codicon:library" displayText="Library " />
               </div>
               <div className="pt-5">
                  <IconText
                     iconName="ic:round-add-box"
                     displayText="Create playlist"
                  />
                  <IconText
                     iconName="flat-color-icons:like"
                     displayText="Liked songs"
                  />
               </div>
            </div>

            <div className="px-5">
               <div className="px-2 py-2 border border-gray-300 rounded-full text-white w-1/2 flex space-x-1 items-center justify-center">
                  <Icon icon="ph:globe-duotone" />
                  <div className="ml-2 font-semibold text-sm cursor-pointer">
                     English
                  </div>
               </div>
            </div>
         </div>

         <div className="h-full w-4/5 bg-app-black overflow-auto">
            <div className="navbar w-full bg-black h-1/10 bg-opacity-40 flex items-center justify-end">
               <div className="w-1/2 flex h-full">
                  <div className="w-3/5 flex justify-around items-center">
                     <NavButton displayText={"Premium"} />
                     <NavButton displayText={"Support"} />
                     <NavButton displayText={"Download"} />
                     <div className="h-1/2 border border-white"></div>
                  </div>
                  <div className="w-2/5  h-full flex items-center justify-around">
                     <NavButton displayText={"Sign Up"} />
                     <div className="logInBtn cursor-pointer h-2/3 px-8 bg-white font-semibold rounded-full flex items-center justify-center">
                        <Link to="/login">Log In</Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content p-8 pt-0 overflow-auto">
               <div className="text-2xl font-semibold mb-5 text-white">
                  Upload your music
               </div>
               <div className="w-2/3 flex space-x-3">
                  <div className="w-1/2 text-white">
                     <TextInput label="Name" placeholder="Name" />
                  </div>
                  <div className="w-1/2 text-white">
                     <TextInput label="Thumbnail" placeholder="Thumbnail" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UploadSong;
