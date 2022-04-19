import { Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";

function App() {
  return (
    <div className="App">
      <h1>NC NEWS</h1>
      <Routes>
        <Route path="/" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
