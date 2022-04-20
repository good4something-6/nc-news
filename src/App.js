import { Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
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
        <Route key="NO FILTER" path="/" element={<Articles />} />
        {topicsList.map((ele) => {
          return (
            <Route
              key={ele.slug}
              path={`/${ele.slug}`}
              element={<Articles topicFilter={ele.slug} />}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
