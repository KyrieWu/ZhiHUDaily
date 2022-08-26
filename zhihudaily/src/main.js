import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
// 导入Vant
import Vant from "vant";
import "./assets/reset.min.css";
import "amfe-flexible";
import "vant/lib/index.css";

const app = createApp(App);
app.use(Vant);
app.use(store);
app.use(router);
app.mount("#app");
