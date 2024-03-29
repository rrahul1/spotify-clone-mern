import React from "react";

export const PlaylistCard = ({ songStaticData }) => {
   return (
      <div className="text-white mt-8">
         {songStaticData.map((song, i) => (
            <div key={i}>
               <div className="text-2xl font-semibold mb-5">
                  {song.titleText}
               </div>
               <div className="w-full flex justify-between  space-x-5 ">
                  <Card
                     title={song.title}
                     description={song.description}
                     imgUrl={song.imgUrl}
                  />
                  <Card
                     title={song.title}
                     description={song.description}
                     imgUrl={song.imgUrl}
                  />
                  <Card
                     title={song.title}
                     description={song.description}
                     imgUrl={song.imgUrl}
                  />
                  <Card
                     title={song.title}
                     description={song.description}
                     imgUrl={song.imgUrl}
                  />
                  <Card
                     title={song.title}
                     description={song.description}
                     imgUrl={song.imgUrl}
                  />
               </div>
            </div>
         ))}
      </div>
   );
};

export const Card = ({ title, description, imgUrl }) => {
   return (
      <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg flex flex-col justify-between">
         <div className="pb-4 pt-2">
            <img className="w-full rounded-md" src={imgUrl} alt="label" />
         </div>
         <div>
            <div className=" text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
         </div>
      </div>
   );
};
