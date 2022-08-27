<template>
  <Head time="20220826"></Head>
</template>

<script>
import Head from "../components/Head.vue";
import { reactive, toRefs } from "vue";
import api from "@/api";
export default {
  name: "HomeItem",
  components: {
    Head,
  },
  setup() {
    let state = reactive({
      today: "",
      newsList: [],
      bannerList: [],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped></style>
