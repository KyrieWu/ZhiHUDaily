import axios from "./http";

export default {
  queryNewsLatest() {
    return axios.get("/api/news_latest");
  },
  // 获取往日新闻
  queryNewsBefore(time) {
    return axios.get("/api/news_before", {
      params: {
        time,
      },
    });
  },
  // 获取新闻详情
  queryNewsInfo(id) {
    return axios.get("/api/news_info", {
      params: {
        id,
      },
    });
  },
  // 获取评论数
  queryNewsStory(id) {
    return axios.get("/api/story_extra", {
      params: {
        id,
      },
    });
  },
};
