import { openUploadWidget } from "../../utils/cloudinaryService";
import { upload_preset } from "../../config";

const CloudinaryUpload = ({ setUrl, setName }) => {
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
               setUrl(result.info.secure_url);
               setName(result.info.original_filename);
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
         Select Track
      </button>
   );
};

export default CloudinaryUpload;
