import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./singleArticle.css";
import Comments from "./Comments";
import ErrorComponent from "../errorhandling";
import { getSingleArticle, updateVotesAPI } from "../api";

const SingleArticle = () => {
  const { articleID } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [commentsFlag, setCommentsFlag] = useState(false);
  const [votes, setVotes] = useState();
  const [voteErr, setVoteErr] = useState();
  const [votedFlag, setVotedFlag] = useState(false);
  const [comments, setComments] = useState([]);
  const [articleError, setArticleError] = useState(false);

  useEffect(() => {
    getSingleArticle(articleID)
      .then((article) => {
        setSingleArticle(article);
        setVotes(article.votes);
        setArticleError("");
      })
      .catch((err) => {
        setArticleError(err);
      });
  }, [articleID, comments]);

  const navigate = useNavigate();
  const clickHandlerHome = () => {
    navigate(-2);
  };

  const voteHandler = (article_id, voteInc) => {
    setVotes((currVotes) => currVotes + voteInc);
    setVotedFlag(true);
    setVoteErr(null);
    updateVotesAPI(article_id, voteInc)
      .then((response) => {
        return response;
      })
      .catch(() => {
        setVotes((currVotes) => currVotes - voteInc);
        setVoteErr("Voting failed");
        setVotedFlag(false);
      });
  };

  return (
    <>
      {articleError ? (
        ErrorComponent(articleError)
      ) : (
        <div className="grid-container">
          <div id="gridBackground" className="grid-item"></div>
          <div id="gridHomeButton" className="grid-item">
            <button id="homeButton" onClick={clickHandlerHome}>
              Back To All News Articles
            </button>
          </div>
          <div id="gridVotes" className="grid-item">
            <ul>
              <li>
                {voteErr ? " Voting Failed. Please retry" : "Votes: " + votes}
              </li>
              <li>------------</li>
              <li>
                <button
                  id="voteButton"
                  disabled={votedFlag}
                  onClick={() => {
                    voteHandler(singleArticle.article_id, 1);
                  }}
                >
                  {votedFlag ? "Voted" : "Vote +"}
                </button>
                <button
                  id="voteButton"
                  disabled={votedFlag}
                  hidden={votedFlag}
                  onClick={() => {
                    voteHandler(singleArticle.article_id, -1);
                  }}
                >
                  {votedFlag ? "Voted" : "Vote -"}
                </button>
              </li>
            </ul>
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
      )}
      {commentsFlag ? (
        <Comments
          articleID={articleID}
          comments={comments}
          setComments={setComments}
        />
      ) : null}
    </>
  );
};

export default SingleArticle;
