import { Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div className="App">
      <h1>NC NEWS</h1>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:articleID" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
