import React, { useContext } from "react";
import songContext from "../../context/songContext";

const SingleSongCard = ({ info, playMusic }) => {
   const { currentSong, setCurrentSong } = useContext(songContext);

   return (
      <>
         {info.map((song) => (
            <div key={song._id} onClick={() => setCurrentSong(song)}>
               <div
                  className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-md text-white"
                  onClick={() => playMusic(song?.track)}
               >
                  <div
                     className="w-12 h-12 bg-cover bg-center"
                     style={{
                        backgroundImage: `url(${song?.thumbnail})`,
                     }}
                     onClick={() => setCurrentSong(info)}
                  ></div>
                  <div className="flex w-full text-white">
                     <div className="text-white flex flex-col justify-center items-start pl-4 w-5/6 ">
                        <div className="hover:cursor-pointer hover:underline">
                           {song?.name}
                        </div>
                        <div className="text-gray-400 text-xs hover:cursor-pointer hover:underline">
                           {song?.artist?.firstname +
                              " " +
                              song?.artist?.lastname}
                        </div>
                     </div>
                     <div className="w-1/6 flex items-center justify-center">
                        dur
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </>
   );
};

export default SingleSongCard;
