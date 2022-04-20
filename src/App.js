import { Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Topics from "./components/Topics";
import { useState } from "react";

function App() {
  const [topicFilter, setTopicFilter] = useState(null);
  const [topicsList, setTopicsList] = useState([]);

  return (
    <div className="App">
      <h1>NC NEWS</h1>
      <Topics
        setTopicFilter={setTopicFilter}
        topicsList={topicsList}
        setTopicsList={setTopicsList}
      />
      <Routes>
        {/* <Route path="/" element={<Articles />} /> */}
        <Route path="/articles/:articleID" element={<SingleArticle />} />
        <Route key="NO FILTER" path="/" element={<Articles />} />
        <Route
          key="topicSlug"
          path={`/topic/:topicSlug`}
          element={<Articles />}
        />
      </Routes>
    </div>
  );
}

export default App;
