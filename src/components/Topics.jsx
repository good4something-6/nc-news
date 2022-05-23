import { useEffect } from "react";

import TopicSelectDropdown from "./TopicSelectDropdown";
import { getTopics } from "../api";

const Topics = ({ topicFilter, setTopicFilter, topicsList, setTopicsList }) => {
  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopicsList(topics);
      })
      .catch(() => {
        setTopicsList([{ slug: "Error Retrieving Topics" }]);
      });
  }, [setTopicsList]);

  return (
    <TopicSelectDropdown
      setTopicFilter={setTopicFilter}
      topicsList={topicsList}
      topicFilter={topicFilter}
    />
  );
};

export default Topics;
