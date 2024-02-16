import React, { useState } from "react";
import TextInput from "../shared-components/TextInput";
import CloudinaryUpload from "../shared-components/CloudinaryUpload";
import { authenticatedPostRequest } from "../../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const UploadSong = () => {
   const [name, setName] = useState("");
   const [songName, setSongName] = useState("");
   const [thumbnail, setThumbnail] = useState("");
   const [playlistUrl, setPlaylistUrl] = useState("");
   const navigate = useNavigate();

   const uploadSong = async () => {
      const data = { name, thumbnail, track: playlistUrl };
      const response = await authenticatedPostRequest("/song/create", data);
      if (!response) {
         alert("Could not create song");
      }
      console.log(response);
      navigate("/home");
   };

   return (
      <div className="content p-8 pt-0 overflow-auto mt-4">
         <div className="text-2xl font-semibold mb-5 text-white">
            Upload your music
         </div>
         <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
               <TextInput
                  label="Name"
                  placeholder="Name"
                  value={name}
                  setValue={setName}
               />
            </div>
            <div className="w-1/2 ">
               <TextInput
                  label="Thumbnail"
                  placeholder="Thumbnail"
                  value={thumbnail}
                  setValue={setThumbnail}
               />
            </div>
         </div>
         <div className="pt-5 ">
            {songName && songName ? (
               <div className="font-semibold text-lg text-green-500 rounded-full p-3 w-2/3 bg-white">
                  {songName.substring(0, 35)}...
               </div>
            ) : (
               <CloudinaryUpload
                  setUrl={setPlaylistUrl}
                  setName={setSongName}
               />
            )}
         </div>
         <div
            className="mt-4 cursor-pointer font-bold bg-green-500 flex items-center justify-center w-1/3 text-black p-4 rounded-full"
            onClick={uploadSong}
         >
            Upload Song
         </div>
      </div>
   );
};

export default UploadSong;
