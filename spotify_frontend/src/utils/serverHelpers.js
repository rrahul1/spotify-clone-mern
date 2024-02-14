import axios from "axios";
import { backendUrl } from "./config";

export const unauthenticatedPostRequest = async (route, body) => {
   try {
      const response = await axios.post(`${backendUrl}${route}`, body);

      // Handle response
      return response.data;
   } catch (error) {
      // Handle error
      console.error("Error:", error.message);
   }
};
