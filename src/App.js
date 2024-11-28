import "./App.css";
import Home from "./Components/Home";
import ProtectedPage from "./Components/ProtectedPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protected" element={<ProtectedRoute><ProtectedPage /></ProtectedRoute>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
