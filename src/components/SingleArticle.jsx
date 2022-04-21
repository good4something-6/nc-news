import { useEffect, useState } from "react";
import { getSingleArticle } from "../api";
import { useParams } from "react-router-dom";
import "./singleArticle.css";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const SingleArticle = () => {
  const { articleID } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [commentsFlag, setCommentsFlag] = useState(false);
  useEffect(() => {
    getSingleArticle(articleID).then((article) => {
      setSingleArticle(article);
    });
  }, [articleID]);

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  return (
    <>
      <div className="grid-container">
        <div id="gridBackground" className="grid-item"></div>
        <div id="gridHomeButton" className="grid-item">
          <button id="homeButton" onClick={clickHandler}>
            Show All News Articles
          </button>
        </div>
        <div id="gridTitle" className="grid-item">
          {singleArticle.title}
        </div>
        <div id="gridBody" className="grid-item">
          {singleArticle.body}
        </div>
        <div id="gridAuthor" className="grid-item">
          <p>Author: {singleArticle.author}</p>
        </div>
        <div id="gridTopic" className="grid-item">
          <p>Topic: {singleArticle.topic}</p>
        </div>
        <div id="gridCreated" className="grid-item">
          <p>Created: {singleArticle.created_at}</p>
        </div>
        <div id="gridVotes" className="grid-item">
          <ul>
            <li>Votes</li>
            <li>{singleArticle.votes}</li>
          </ul>
          <button>Button Not working yet</button>
        </div>
        <div id="gridComments" className="grid-item">
          <ul>
            <li>Comments: {singleArticle.comment_count}</li>
            <li>----------</li>
            <li>
              <button
                id="commentsButton"
                onClick={() => {
                  setCommentsFlag((status) => {
                    return !status;
                  });
                }}
              >
                {commentsFlag ? "Hide Comments" : "Show Comments"}
              </button>
            </li>
          </ul>
        </div>
      </div>
      {commentsFlag ? <Comments articleID={articleID} /> : null}
    </>
  );
};

export default SingleArticle;
