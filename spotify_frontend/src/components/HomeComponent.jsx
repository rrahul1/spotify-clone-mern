import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
   let { activeComponent } = useParams();
   const navigate = useNavigate();

   const [play, setPlay] = useState(null);
   const [isPaused, setisPaused] = useState(null);

   const playMusic = (songSrc) => {
      if (play) {
         play.stop();
      }
      let music = new Howl({
         src: [songSrc],
         html5: true,
      });

      setPlay(music);
      music.play();
   };

   const pauseMusic = () => {
      if (play) {
         play.pause();
      }
   };

   const togglePlayPause = () => {
      if (isPaused) {
         playMusic(
            "https://res.cloudinary.com/dgghp0x54/video/upload/v1708095887/n6r7vqxry7petcmbddwl.mp3"
         );
         setisPaused(false);
      } else {
         pauseMusic();
         setisPaused(true);
      }
   };

   const handleNavClick = (componentName) => {
      navigate(`/${componentName}`);
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

   useEffect(() => {
      if (!activeComponent) {
         navigate("/home");
      }
   }, [activeComponent, navigate]);

   if (!activeComponent) {
      return <HomeBody />;
   }

   // Return the component based on the activeComponent state
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
                        to={"/:home"}
                        active={activeComponent === "home"}
                        handleNavClick={() => handleNavClick("home")}
                     />
                     <IconText
                        iconName="ic:baseline-search"
                        displayText="Search "
                        to="/:search"
                        active={activeComponent === "search"}
                        handleNavClick={() => handleNavClick("search")}
                     />
                     <IconText
                        iconName="codicon:library"
                        displayText="Library "
                        to="/:library"
                        active={activeComponent === "library"}
                        handleNavClick={() => handleNavClick("library")}
                     />
                     <IconText
                        iconName="ic:round-library-music"
                        displayText="My Music "
                        to="/:mymusic"
                        active={activeComponent === "mymusic"}
                        handleNavClick={() => handleNavClick("mymusic")}
                     />
                  </div>
                  <div className="pt-5">
                     <IconText
                        iconName="ic:round-add-box"
                        displayText="Create playlist"
                        to=":/create-playlist"
                        active={activeComponent === "create-playlist"}
                        handleNavClick={() => handleNavClick("create-playlist")}
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
                                 to="/:uploadsongs"
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleClick("uploadsongs");
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
                  {/* Render the component based on the activeComponent state */}
                  {activeComponent === "home" && <HomeBody />}
                  {activeComponent === "uploadsongs" && <UploadSong />}
                  {activeComponent === "mymusic" && <MyMusic />}
               </div>
            </div>
         </div>
         <div className="w-full h-1/10 bg-black opacity-40 flex items-center p-4 text-white">
            <div className="w-1/3 flex items-center">
               <img
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                  alt="songthumbnail"
                  className="h-14 w-14 rounded"
               />
               <div className="pl-4">
                  <div className="text-sm hover:underline cursor-pointer">
                     Song name
                  </div>
                  <div className="text-xs text-gray-400 hover:underline cursor-pointer">
                     Singer name
                  </div>
               </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center h-full">
               <div className="flex w-1/3 justify-between items-center">
                  {/* controls for the playing song go here */}
                  <Icon
                     icon="ph:shuffle-fill"
                     fontSize={30}
                     className="cursor-pointer text-gray-500 hover:text-white"
                  />
                  <Icon
                     icon="mdi:skip-previous-outline"
                     fontSize={30}
                     className="cursor-pointer text-gray-500 hover:text-white"
                  />
                  <Icon
                     icon={
                        isPaused
                           ? "ic:baseline-play-circle"
                           : "ic:baseline-pause-circle"
                     }
                     fontSize={50}
                     className="cursor-pointer text-gray-500 hover:text-white"
                     onClick={togglePlayPause}
                  />
                  <Icon
                     icon="mdi:skip-next-outline"
                     fontSize={30}
                     className="cursor-pointer text-gray-500 hover:text-white"
                  />
                  <Icon
                     icon="ic:twotone-repeat"
                     fontSize={30}
                     className="cursor-pointer text-gray-500 hover:text-white"
                  />
               </div>
               {/* <div>Progress bar</div> */}
            </div>
            <div className="w-1/3 flex justify-end ">last</div>
         </div>
      </div>
   );
};

export default HomeComponent;
