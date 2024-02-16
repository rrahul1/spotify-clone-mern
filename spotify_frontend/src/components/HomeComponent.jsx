import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import spotifyLogo from "../assets/spotify_logo_white.svg";
import IconText from "./shared-components/IconText";
import NavButton from "./shared-components/NavButton";
import { backendUrl } from "../utils/config";
import { useCookies } from "react-cookie";
import HomeBody from "./pages/HomeBody";
import UploadSong from "./pages/UploadSong";
import MyMusic from "./MyMusic";

const HomeComponent = () => {
   const [cookie] = useCookies(["token"]);
   const [data, setData] = useState(null);
   const token = cookie.token;
   const [activeComponent, setActiveComponent] = useState("HomeBody");

   const handleNavClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const handleClick = (componentName) => {
      if (handleNavClick) {
         handleNavClick(componentName);
      }
   };

   useEffect(() => {
      axios
         .get(`${backendUrl}/auth/userdetail/${token}`)
         .then((res) => setData(res.data))
         .catch((error) => {
            console.log(error);
         });
   }, [token]);

   return (
      <div className="size-full bg-app-black">
         <div className="w-full h-9/10 flex">
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
               <div>
                  <div className="logoDiv p-6 ">
                     <img src={spotifyLogo} alt="spotify logo" width={140} />
                  </div>
                  <div className="py-5">
                     <IconText
                        iconName="material-symbols:home"
                        displayText="Home "
                        to="/home"
                        active={activeComponent === "HomeBody"}
                        handleNavClick={() => handleNavClick("HomeBody")}
                     />
                     <IconText
                        iconName="ic:baseline-search"
                        displayText="Search "
                        to="/search"
                        active={activeComponent === "Search"}
                        handleNavClick={() => handleNavClick("Search")}
                     />
                     <IconText
                        iconName="codicon:library"
                        displayText="Library "
                        to="/library"
                        active={activeComponent === "Library"}
                        handleNavClick={() => handleNavClick("Library")}
                     />
                     <IconText
                        iconName="ic:round-library-music"
                        displayText="My Music "
                        to="/mymusic"
                        active={activeComponent === "MyMusic"}
                        handleNavClick={() => handleNavClick("MyMusic")}
                     />
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
                     {data && data ? (
                        <div className="ml-2 font-semibold text-sm cursor-pointer">
                           Sign Out
                        </div>
                     ) : (
                        <div>
                           <Icon icon="ph:globe-duotone" />
                           <div className="ml-2 font-semibold text-sm cursor-pointer">
                              English
                           </div>
                        </div>
                     )}
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
                        {data && data ? (
                           <div className="text-gray-300">
                              <Link
                                 to="/uploadsongs"
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleClick("UploadSong");
                                 }}
                              >
                                 Upload Song
                              </Link>
                           </div>
                        ) : (
                           <NavButton displayText={"Sign Up"} />
                        )}

                        <div className="logInBtn cursor-pointer h-2/3 px-8 bg-white font-semibold rounded-full flex items-center justify-center">
                           {data && data ? (
                              data?.username
                           ) : (
                              <Link to="/login">Log In</Link>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="playlistDiv p-8  pt-0 overflow-auto">
                  {activeComponent === "HomeBody" && <HomeBody />}
                  {activeComponent === "UploadSong" && <UploadSong />}
                  {activeComponent === "MyMusic" && <MyMusic />}
               </div>
            </div>
         </div>
         <div className="w-full h-1/10 bg-black opacity-40 flex items-center p-4 text-white">
            <div className="w-1/4 flex items-center">
               <img
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                  alt="song image"
                  className="h-14 w-14 rounded"
               />
               <div className="px-4">
                  <div className="text-sm hover:underline cursor-pointer">
                     Song name
                  </div>
                  <div className="text-xs text-gray-400 hover:underline cursor-pointer">
                     Singer name
                  </div>
               </div>
            </div>
            <div className="w-1/2 flex justify-center bg-pink-500">control</div>
            <div className="w-1/4 flex justify-end ">last</div>
         </div>
      </div>
   );
};

export default HomeComponent;
