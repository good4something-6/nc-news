import { useEffect, useState } from "react";
import { getArticleComments } from "../api";
import "./Comments.css";

const Comments = ({ articleID }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getArticleComments(articleID).then((commentsData) => {
      setComments(commentsData);
    });
  }, [articleID]);

  return (
    <>
      <div className="gridComments" key={"grid_title"}>
        <div id="gridCommentInfo">
          Author<br></br>Date
        </div>
        <div id="gridCommentBody">Comments</div>
      </div>

      {comments.map((ele) => {
        return (
          <div className="gridComments" key={"grid_" + ele.comment_id}>
            <div id="gridCommentInfo">
              <ul>
                <li>{ele.author}</li>
                <li>{ele.created_at.slice(0, 10)}</li>
              </ul>
            </div>
            <div id="gridCommentBody">{ele.body}</div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
