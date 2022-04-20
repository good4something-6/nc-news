import { useNavigate } from "react-router-dom";

const TopicSelectDropdown = ({ setTopicFilter, topicsList }) => {
  const navigate = useNavigate();
  return (
    <p>
      Topic Filter:
      <select
        className="selectList"
        defaultValue={"Info"}
        onChange={(e) => {
          setTopicFilter(e.target.value);
          navigate(e.target.value);
        }}
      >
        <option key="Info" value="Info" disabled>
          Click to select topic filter
        </option>
        <option key="NONE" value="/">
          Show All Topics
        </option>
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
