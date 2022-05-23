import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";

function App() {
  const [topicFilter, setTopicFilter] = useState(null);

  return (
    <div className="App">
      <h1>NC NEWS</h1>
  
      <Routes>
        <Route path="/articles/:articleID" element={<SingleArticle />} />
        <Route
          key="NO FILTER"
          path="/"
          element={
            <Articles
              topicFilter={topicFilter}
              setTopicFilter={setTopicFilter}
            />
          }
        />
        <Route
          key="topicSlug"
          path={`/topic/:topicSlug`}
          element={
            <Articles
              topicFilter={topicFilter}
              setTopicFilter={setTopicFilter}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
