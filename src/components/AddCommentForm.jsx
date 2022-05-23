import { useState } from "react";
import { postArticleCommentsAPI } from "../api";

const AddCommentForm = ({ articleID, username, comments, setComments }) => {
  const [commentTextToAdd, setCommentTextToAdd] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let commentToAdd = {
      author: username,
      body: commentTextToAdd,
      created_at: "Just Now",
      comment_id: 3000000,
      votes: 0,
    };

    setComments((comments) => {
      return [commentToAdd, ...comments];
    });

    postArticleCommentsAPI(articleID, username, commentTextToAdd)
      .then((response) => {
        setComments(() => {
          return [response, ...comments];
        });
      })
      .catch((err) => {
        setComments((comments) => {
          return [...comments.slice(1)];
        });
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
