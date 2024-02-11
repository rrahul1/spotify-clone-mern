import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";

function App() {
   return (
      <div className="h-screen w-screen">
         <BrowserRouter>
            <Routes>
               <Route
                  path="/"
                  element={<h1 className="bg-red-500">Hello</h1>}
               />
               <Route path="/login" element={<LoginComponent />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
