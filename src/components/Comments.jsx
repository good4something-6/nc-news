import { useEffect, useState } from "react";
import { getArticleComments, deleteArticleComment } from "../api";
import "./Comments.css";
import AddCommentForm from "./AddCommentForm";

const Comments = ({ articleID }) => {
  const [comments, setComments] = useState([]);
  const [addCommentsFlag, setAddCommentsFlag] = useState(true);
  const currUser = "jessjelly";

  useEffect(() => {
    getArticleComments(articleID).then((commentsData) => {
      setComments(commentsData);
    });
  }, [articleID]);

  const deleteCommentClickHandler = (comment_id) => {
    let commentToDelete = comments.filter((ele) => {
      return ele.comment_id === comment_id;
    })[0];

    setComments((commentsData) => {
      return commentsData.filter((ele) => {
        return ele.comment_id !== comment_id;
      });
    });

    deleteArticleComment(comment_id).catch((err) => {
      setComments((commentsData) => {
        return [...comments, commentToDelete];
      });
    });
  };

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
              username={currUser}
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
            {ele.author === currUser ? (
              <div id="gridCommentDelete">
                <button
                  id="deleteCommentButton"
                  onClick={() => deleteCommentClickHandler(ele.comment_id)}
                >
                  Delete your comment
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Comments;
