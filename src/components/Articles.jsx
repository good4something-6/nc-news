import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticlesList(articles);
      setIsLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  const clickHandler = (articleId) => {
    console.log(articleId);
    navigate(`/articles/${articleId}`);
  };
  return (
    <section name="Articles List">
      <header className="App-header">Latest Articles</header>
      {isLoading ? <p className="App-header">Loading Articles</p> : null}
      <div id="articleListBox">
        {articlesList.map((ele) => {
          return (
            <div key={"articleCard" + ele.article_id} className="articleCard">
              <ul>
                <li className="articleCardTitle">{ele.title}</li>
                <li className="articleCardTopic">topic: {ele.topic}</li>
                <li className="articleCardCreated">Date: {ele.created_at}</li>
                <li className="articleCardVotes">votes: {ele.votes}</li>
                <li className="articleCardButtonLi">
                  <button
                    className="articleCardViewButton"
                    onClick={() => clickHandler(ele.article_id)}
                  >
                    View News
                  </button>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Articles;
