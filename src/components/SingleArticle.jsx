import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./singleArticle.css";
import { getSingleArticle, updateVotesAPI } from "../api";

const SingleArticle = () => {
  const { articleID } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [votes, setVotes] = useState();
  const [voteErr, setVoteErr] = useState();
  const [votedFlag, setVotedFlag] = useState(false);

  useEffect(() => {
    getSingleArticle(articleID).then((article) => {
      setSingleArticle(article);
      setVotes(article.votes);
    });
  }, [articleID]);

  const navigate = useNavigate();
  const clickHandlerHome = () => {
    navigate("/");
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
      <div>
        <p></p>
      </div>
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
                {votedFlag ? "Voted" : "Vote For Article"}
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
            <li>Comments</li>
            <li>{singleArticle.comment_count}</li>
          </ul>
          <button>Button Not working yet</button>
        </div>
      </div>
    </>
  );
};

export default SingleArticle;
