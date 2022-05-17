import { useState } from "react";
import { postArticleCommentsAPI } from "../api";

const AddCommentForm = ({ articleID, username, comments, setComments }) => {
  const [commentTextToAdd, setCommentTextToAdd] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setComments((comments) => {
      return [
        {
          author: username,
          body: commentTextToAdd,
          created_at: "Just Now",
        },
        ...comments,
      ];
    });

    postArticleCommentsAPI(articleID, username, commentTextToAdd)
      .then((response) => {
        setComments((comments) => {
          return [response, ...comments.slice(1)];
        });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const changeHandler = (e) => {
    setCommentTextToAdd(e.target.value);
  };

  return (
    <div className="commentForm" id="commentForm">
      <form className="commentform-container" onSubmit={formSubmitHandler}>
        <textarea
          id="commentText"
          name="commentText"
          placeholder="Enter comment..."
          required
          onChange={changeHandler}
        ></textarea>
        <br></br>
        <input type="submit" value="submit comment"></input>
      </form>
    </div>
  );
};

export default AddCommentForm;
