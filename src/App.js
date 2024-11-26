import "./App.css";
import Home from "./Components/Home";
import HeaderComponent from "./Components/HeaderComponent";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
