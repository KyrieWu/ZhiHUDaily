<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="HomeItem">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
html,
body {
  min-height: 100%;
  overflow-x: hidden;
  background: #f4f4f4;
}
#app {
  margin: 0 auto;
  background: #fff;
}
</style>
