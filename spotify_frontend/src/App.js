import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import HomeComponent from "./components/HomeComponent";
import { useCookies } from "react-cookie";

function App() {
   const [cookie, setCookie] = useCookies(["token"]);
   return (
      <div className="h-screen w-screen font-poppins">
         <BrowserRouter>
            {cookie.token ? (
               <Routes>
                  <Route
                     path="/"
                     element={<h1 className="bg-red-500">Hello</h1>}
                  />
                  <Route path="/home" element={<HomeComponent />} />
                  <Route path="*" element={<Navigate to="/home" />} />
               </Routes>
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
