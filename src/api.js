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

export const getSingleArticle = (articleID) => {
  return articlesApi.get(`/articles/${articleID}`).then(({ data }) => {
    return data.article;
  });
};

export const getArticleComments = (articleID) => {
  return articlesApi.get(`/articles/${articleID}/comments`).then(({ data }) => {
    let commentsArray = [...data.comments];
    commentsArray.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return commentsArray;
  });
};

export const deleteArticleComment = (comment_id) => {
  return articlesApi.delete(`/comments/${comment_id}`);
  
};

export const getTopics = () => {
  return articlesApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const updateVotesAPI = (articleId, number) => {
  return articlesApi
    .patch(`/articles/${articleId}`, { inc_votes: number })
    .then(({ data }) => {
      return data.article;
    });
};

export const postArticleCommentsAPI = (articleId, username, commentText) => {
  let reqBody = {
    body: commentText,
    username: username,
  };
  return articlesApi
    .post(`/articles/${articleId}/comments`, reqBody)
    .then((response) => {
      return response.data.restaurant;
    });
};
