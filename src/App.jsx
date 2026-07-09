import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Register from "./components/Register";
import Login from "./components/Login";
import Education from "./components/Education";

import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="696881945025-61cubc96qvppp67k89t8jcd4spsjstaa.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;