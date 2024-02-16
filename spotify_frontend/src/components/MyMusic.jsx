import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import SingleSongCard from "./shared-components/SingleSongCard";
import { authenticatedGetRequest } from "../utils/serverHelpers";

const MyMusic = () => {
   const [songData, setSongData] = useState([]);
   const [play, setPlay] = useState(null);

   const playMusic = (songSrc) => {
      if (play) {
         play.stop();
         return;
      }
      let music = new Howl({
         src: [songSrc],
         html5: true,
      });

      setPlay(music);
      music.play();
   };

   useEffect(() => {
      const getData = async () => {
         const response = await authenticatedGetRequest("/song/get/mysongs");
         setSongData(response.data);
      };
      getData();
   }, []);

   return (
      <div className="p-5 overflow-auto">
         <div className="text-white text-xl font-semibold pb-4 pl-2">
            My Songs
         </div>
         <div className="space-y-3 overflow-auto">
            <SingleSongCard info={songData} playMusic={playMusic} />
         </div>
      </div>
   );
};

export default MyMusic;
