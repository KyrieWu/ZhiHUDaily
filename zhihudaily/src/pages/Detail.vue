<template>
  <van-skeleton title :row="5" v-if="newsInfo === null" />
  <div class="content" v-else v-html="newsInfo.body"></div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="handle" />
    <van-icon name="comment-o" :badge="comments" />
    <van-icon name="good-job-o" :badge="popularity" />
    <van-icon name="star-o" color="#1989fa" />
    <van-icon name="share-o" color="#ccc" />
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import {
  reactive,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
  onUpdated,
} from "vue";
import api from "@/api";
export default {
  name: "DetailItem",
  setup() {
    const router = useRouter(),
      route = useRoute();

    let state = reactive({
      comments: 0,
      popularity: 0,
      newsInfo: null,
    });

    onBeforeMount(async () => {
      let id = route.params.id;
      let result = await api.queryNewsInfo(id);
      state.newsInfo = result;
      // 动态创建css
      let link = document.createElement("link");
      link.id = "link";
      link.rel = "stylesheet";
      link.href = state.newsInfo.css[0];
      document.head.appendChild(link);
      let { popularity, comments } = await api.queryNewsStory(id);
      state.popularity = popularity;
      state.comments = comments;
    });

    onUpdated(() => {
      let imgPlaceHolder = document.querySelector(".img-place-holder");
      if (imgPlaceHolder) {
        if (imgPlaceHolder.innerHTML.trim() === "") {
          imgPlaceHolder.innerHTML += `<img src="${state.newsInfo.image}" alt=""/>`;
        }
      }
    });

    onBeforeUnmount(() => {
      let link = document.getElementById("link");
      if (!link) return;
      document.head.removeChild(link);
    });

    const handle = () => {
      router.back();
    };

    return {
      ...toRefs(state),
      handle,
    };
  },
};
</script>
<style lang="less" scoped>
.content {
  background: #fff;
  padding-bottom: 50px;
  margin: 0;

  /deep/ .img-place-holder {
    height: 375px;
    overflow: hidden;
    img {
      display: block;
      margin: 0;
      width: 100%;
      min-height: 100%;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.nav-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  box-sizing: border-box;

  .van-icon:nth-child(1) {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 1px;
      height: 120%;
      background: #d5d5d5;
      right: -15px;
      top: -10%;
    }
  }

  /deep/ .van-badge {
    background-color: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>
