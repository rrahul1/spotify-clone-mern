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

export const authenticatedPostRequest = async (route, body) => {
   const token = getToken();
   try {
      const response = await axios.post(`${backendUrl}${route}`, body, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      // Handle response
      return response.data;
   } catch (error) {
      // Handle error
      console.error("Error:", error.message);
   }
};

export const authenticatedGetRequest = async (route) => {
   const token = getToken();
   try {
      const response = await axios.get(`${backendUrl}${route}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      // Handle response
      return response.data;
   } catch (error) {
      // Handle error
      console.error("Error:", error.message);
   }
};

const getToken = () => {
   const accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
   );
   return accessToken;
};
