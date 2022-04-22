import { useNavigate } from "react-router-dom";

const TopicSelectDropdown = ({ topicFilter, setTopicFilter, topicsList }) => {
  const navigate = useNavigate();
  return (
    <p>
      Display articles with the chosen topic :
      <select
        className="selectList"
        defaultValue={"InfoLine"}
        onChange={(e) => {
          setTopicFilter(e.target.value);
          navigate(e.target.value);
        }}
      >
        <option key="Info" value="InfoLine" hidden disabled>
          Click to choose a topic
        </option>
        <option key="NONE" value="/">
          All Topics
        </option>{" "}
        {topicsList.map((ele) => {
          return (
            <option key={"key" + ele.slug} value={"/topic/" + ele.slug}>
              {ele.slug}
            </option>
          );
        })}
      </select>
    </p>
  );
};

export default TopicSelectDropdown;
