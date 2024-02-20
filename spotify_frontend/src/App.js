import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import HomeComponent from "./components/HomeComponent";
import { useCookies } from "react-cookie";
import songContext from "./context/songContext";
import { useState } from "react";

function App() {
   const [cookie] = useCookies(["token"]);
   const [currentSong, setCurrentSong] = useState(null);

   return (
      <div className="h-screen w-screen font-poppins">
         <BrowserRouter>
            {cookie.token ? (
               <songContext.Provider value={{ currentSong, setCurrentSong }}>
                  <Routes>
                     <Route path="/" element={<HomeComponent />} />

                     <Route
                        path="/:activeComponent"
                        element={<HomeComponent />}
                     />
                     <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
               </songContext.Provider>
            ) : (
               <Routes>
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/signup" element={<SignUpComponent />} />
                  <Route path="/home" element={<HomeComponent />} />
                  <Route path="*" element={<Navigate to="/login" />} />
               </Routes>
            )}
         </BrowserRouter>
      </div>
   );
}

export default App;
