import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import HomeComponent from "./components/HomeComponent";

function App() {
   return (
      <div className="h-screen w-screen font-poppins">
         <BrowserRouter>
            <Routes>
               <Route
                  path="/"
                  element={<h1 className="bg-red-500">Hello</h1>}
               />
               <Route path="/login" element={<LoginComponent />} />
               <Route path="/signup" element={<SignUpComponent />} />
               <Route path="/home" element={<HomeComponent />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
