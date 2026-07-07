// import { Routes, Route, Link } from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import "./App.css";

// function App() {
//   return (
//     <>
//       <nav>
//         <Link to="/">Register</Link>
//         <Link to="/login">Login</Link>
//       </nav>

//       <Routes> 
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//        </Routes>
//     </>
//   );
// }

// export default App;




import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Education from "./components/Education";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/education" element={<Education />} />
    </Routes>
  );
}

export default App;