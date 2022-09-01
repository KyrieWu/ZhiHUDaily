<template>
  <Nav />
  <van-form ref="formBox" @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        label-width="50px"
        :rules="[
          { required: true, message: '手机号为必填项哦~' },
          { pattern: regPhone, message: '手机号格式不对哦~' },
        ]"
      >
        <template #button>
          <van-button
            size="small"
            :type="enable ? 'primary' : ''"
            class="form-btn"
            :disabled="!enable"
            @click="sendCode"
          >
            {{ enable ? "发送验证码" : time }}
          </van-button>
        </template>
      </van-field>

      <van-field
        v-model="code"
        label="验证码"
        label-width="50px"
        :rules="[
          { required: true, message: '验证码为必填项哦~' },
          { pattern: regCode, message: '验证码必须是6位数字哦~' },
        ]"
      />
    </van-cell-group>
    <div style="margin: 20px 40px">
      <van-button round block type="primary" native-type="submit">
        立即登录/注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref, toRefs, reactive } from "vue";
import Nav from "@/components/Nav.vue";
import api from "@/api";
import { Toast } from "vant";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "LoginItem",
  components: {
    Nav,
  },
  setup() {
    let state = reactive({
      phone: "",
      code: "",
      enable: true,
      time: "60s",
    });
    const formBox = ref(null);
    const username = ref("");
    const password = ref("");
    const store = useStore();
    const route = useRoute(),
      router = useRouter();
    const onSubmit = async () => {
      let { code, token } = await api.login(state.phone, state.code);
      if (+code !== 0) {
        Toast("小主，很遗憾，当前登录失败了~");
        formBox.value.resetValidation();
        state.code = "";
        return;
      }

      localStorage.setItem("token", token);
      store.commit("changeIsLogin", true);
      store.dispatch("changeInfoAsync");
      // store.commit("changeStoreList", null);
      Toast("小主真棒，当前登录成功喽~");

      // 跳转到指定地址
      let from = route.query.from;
      if (from) {
        router.push(`/${from}`);
        return;
      }
      router.push(`/person`);
    };

    // 发送验证码
    const sendCode = async () => {
      try {
        // 校验手机号格式
        //await formBox.value.validate("phone");
        //发送请求
        let { code } = await api.phoneCode(state.phone);
        if (+code !== 0) {
          Toast("小主，当前网络繁忙，请稍后再试哦~");
          return;
        }

        // 开启按钮倒计时
        state.enable = false;
        state.time = `60s`;
        let n = 60;
        let timer = setInterval(() => {
          n--;
          if (n === 0) {
            clearInterval(timer);
            state.enable = true;
            return;
          }
          state.time = `${n}s`;
        }, 1000);
      } catch (err) {}
    };

    return {
      ...toRefs(state),
      username,
      password,
      onSubmit,
      regPhone: /^1\d{10}$/,
      regCode: /^\d{6}$/,
      sendCode,
    };
  },
};
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 30px;

  .form-btn {
    width: 78px;
  }
}
</style>
