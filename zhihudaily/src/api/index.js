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
};
