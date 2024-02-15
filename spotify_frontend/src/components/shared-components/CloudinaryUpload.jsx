import { openUploadWidget } from "../../utils/cloudinaryService";
import { upload_preset } from "../../config";

const CloudinaryUpload = () => {
   const uploadImageWidget = () => {
      let myUploadWidget = openUploadWidget(
         {
            cloudName: "dgghp0x54",
            uploadPreset: upload_preset,
            tags: ["myname"],
            maxImageWidth: 600,
            sources: ["local", "url"],
         },
         function (error, result) {
            if (!error && result.event === "success") {
               //    onImageUpload(result.info.public_id);
               console.log(result.info);
            } else {
               console.log(error);
            }
         }
      );
      myUploadWidget.open();
   };

   return (
      <button
         className="bg-white text-black rounded-full py-2 px-4 font-semibold"
         onClick={uploadImageWidget}
      >
         Upload Song
      </button>
   );
};

export default CloudinaryUpload;
