import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://be-nc-news-mw.herokuapp.com/api",
});

export const getArticles = (topicFilter) => {
  const queryString = topicFilter
    ? `/articles?topic=${topicFilter}`
    : `/articles`;
  return articlesApi.get(queryString).then(({ data }) => {
    return data.articles;
  });
};

export const getTopics = () => {
  return articlesApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const updateVotes = (articleId, number) => {
  return articlesApi
    .patch(`/articles/${articleId}`, { inc_votes: number })
    .then(({ data }) => {
      return data.article;
    });
};
