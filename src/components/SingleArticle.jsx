import { useEffect, useState } from "react";
import { getSingleArticle } from "../api";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
  const { articleID } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  useEffect(() => {
    getSingleArticle(articleID).then((article) => {
      setSingleArticle(article);
    });
  }, [articleID]);

  return (
    <h1>
      {singleArticle.article_id} : {singleArticle.author}
    </h1>
  );
};

export default SingleArticle;
