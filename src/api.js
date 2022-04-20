import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://be-nc-news-mw.herokuapp.com/api",
});

export const getArticles = () => {
  return articlesApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
