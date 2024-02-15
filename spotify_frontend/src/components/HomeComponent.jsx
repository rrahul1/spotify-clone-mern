import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import spotifyLogo from "../assets/spotify_logo_white.svg";
import IconText from "./shared-components/IconText";
import NavButton from "./shared-components/NavButton";
import { PlaylistCard } from "./shared-components/PlaylistCard";
import { backendUrl } from "../utils/config";
import { useCookies } from "react-cookie";
import { homeSongData } from ".././assets/data/data";

const HomeComponent = () => {
   const [cookie] = useCookies(["token"]);
   const [data, setData] = useState(null);

   const token = cookie.token;

   useEffect(() => {
      axios
         .get(`${backendUrl}/auth/userdetail/${token}`)
         .then((res) => setData(res.data))
         .catch((error) => {
            console.log(error);
         });
   }, [token]);

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
                           <Link to="/uploadsongs">Upload Song</Link>
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
               {homeSongData &&
                  homeSongData.map((res, i) => (
                     <div key={i}>
                        <PlaylistCard
                           titleText={res.titleText}
                           title={res.title}
                           description={res.description}
                           imgUrl={res.imgUrl}
                        />
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
};

export default HomeComponent;
