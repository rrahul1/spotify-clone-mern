import React from "react";
import { homeSongData } from "../../assets/data/data";
import { PlaylistCard } from "../shared-components/PlaylistCard";

const HomeBody = () => {
   return (
      <div>
         {homeSongData &&
            homeSongData.map((res, i) => (
               <div key={i}>
                  <PlaylistCard songStaticData={[res]} />
               </div>
            ))}
      </div>
   );
};

export default HomeBody;
