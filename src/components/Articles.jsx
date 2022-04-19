import { useEffect, useState } from "react";

const Articles = () => {
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    fetch("https://be-nc-news-mw.herokuapp.com/api/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticlesList(data.articles);
      });
  }, []);

  return (
    <section name="Articles List">
      <header className="App-header">Current Articles</header>
      <div id="articleListBox">
        {articlesList.map((ele) => {
          return (
            <div key={"articleCard" + ele.article_id} className="articleCard">
              <ul>
                <li className="articleCardTitle">{ele.title}</li>
                <li className="articleCardTopic">topic: {ele.topic}</li>
                <li className="articleCardCreated">Date: {ele.created_at}</li>
                <li className="articleCardVotes">votes: {ele.votes}</li>
                <button className="articleCardViewButton">View</button>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Articles;
