import { useEffect, useState } from "react";
import { getArticleComments } from "../api";
import "./Comments.css";
import AddCommentForm from "./AddCommentForm";

const Comments = ({ articleID }) => {
  const [comments, setComments] = useState([]);
  const [addCommentsFlag, setAddCommentsFlag] = useState(false);

  useEffect(() => {
    getArticleComments(articleID).then((commentsData) => {
      setComments(commentsData);
    });
  }, [articleID]);

  return (
    <>
      <div className="gridComments" key={"grid_addComment"}>
        <div id="gridCommentButton">
          <button
            id="addCommentButton"
            onClick={() => {
              setAddCommentsFlag((flag) => {
                return !flag;
              });
            }}
          >
            {addCommentsFlag ? "Close Comment Form" : "Add a Comment"}
          </button>
        </div>
        <div id="gridAddCommentForm">
          {addCommentsFlag ? (
            <AddCommentForm
              articleID={articleID}
              username={"jessjelly"}
              comments={comments}
              setComments={setComments}
            />
          ) : null}
        </div>
      </div>

      <div className="gridComments" key={"grid_title"}>
        <div id="gridCommentInfo">
          Author<br></br>Date
        </div>
        <div id="gridCommentBody">Comments</div>
        <div id="gridCommentVotes">Votes</div>
      </div>

      {comments.map((ele, ind) => {
        return (
          <div className="gridComments" key={"grid_" + ele.comment_id + ind}>
            <div id="gridCommentInfo">
              <ul>
                <li>{ele.author}</li>
                <li>{ele.created_at.slice(0, 10)}</li>
              </ul>
            </div>
            <div id="gridCommentBody">{ele.body}</div>
            <div id="gridCommentVotes">{ele.votes}</div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
