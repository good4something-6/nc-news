import { useState } from "react";
import { postArticleCommentsAPI } from "../api";

const AddCommentForm = ({ articleID, username }) => {
  const [commentToAdd, setCommentToAdd] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    postArticleCommentsAPI(articleID, username, commentToAdd)
      .then((response) => {
        console.log("RESPONSE", response);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const changeHandler = (e) => {
    setCommentToAdd(e.target.value);
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
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
};

export default AddCommentForm;
