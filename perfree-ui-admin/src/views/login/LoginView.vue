<template>
  <div class="container">
    <div class="login-box">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">Perfree</h3>
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              type="text"
              size="large"
              auto-complete="off"
              :placeholder="$t('login.account.placeholder')"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-regular fa-user " />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              auto-complete="off"
              :placeholder="$t('login.password.placeholder')"
              @keyup.enter="handleLogin"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-lock " />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
              v-model="loginForm.code"
              auto-complete="off"
              :placeholder="$t('login.captcha.placeholder')"
              size="large"
              style="width: 63%"
              @keyup.enter="handleLogin"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-fax  " />
            </template>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img"/>
          </div>
        </el-form-item>

        <el-form-item style="width:100%;margin-top: 20px">
          <el-button
              :loading="loading"
              size="large"
              type="primary"
              style="width:100%;"
              @click.prevent="handleLogin"
          >
            <span>{{ $t('login.loginBtn') }}</span>
          </el-button>

          <div class="login-bottom-box">
            <div class="register-box">
              {{ $t('login.noAccount') }}, <router-link class="link-type" :to="'/register'" v-if="register">{{ $t('login.registerNow') }}</router-link>
            </div>
            <div class="forget-password-box">
              <a href="javascript:;">{{ $t('login.forgotPassword') }}</a>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="language-box">
      <span class="language-icon"><font-awesome-icon icon="fa-solid fa-language" /></span>
      <el-select v-model="locale" placeholder="Select" style="width: 120px">
        <el-option key="zh" label="中文简体" value="zh"/>
        <el-option key="en" label="English" value="en"/>
      </el-select>
    </div>
    <!--  底部  -->
    <div class="login-footer">
      <span>Copyright © 2018-2024  All Rights Reserved. </span>
    </div>
  </div>
</template>

<script setup>
// 验证码开关
import {getCodeImg, login} from "@/api/system.js";
import {useI18n} from "vue-i18n";
import {CONSTANTS} from "@/utils/constants.js";
import {ElMessage} from "element-plus";

const { proxy } = getCurrentInstance();
const router = useRouter();
let { locale, t } = useI18n();

let captchaEnabled = true;

const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
});

const loginRules = computed(() => ({
  username: [{ required: true, trigger: "blur", message: t('login.account.error') }],
  password: [{ required: true, trigger: "blur", message: t('login.password.error') }],
  code: [{ required: true, trigger: "blur", message: t('login.captcha.error') }]
}))

let codeUrl = ref("");
const loading = ref(false);
// 注册开关
const register = ref(true);

/**
 * 处理登录逻辑
 */
const handleLogin = () => {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      login(loginForm.value).then((res) => {
        if (res.code === 200) {
          localStorage.setItem(CONSTANTS.STORAGE_TOKEN, JSON.stringify(res.data));
          router.replace("/admin");
        } else {
          console.log(1111)
          ElMessage.error(res.msg);
          loginForm.value.code = "";
          loading.value = false;
          getCode();
        }
      }).catch(() => {
      });
    }
  })
}

/**
 * 获取验证码
 */
const getCode = () => {
  getCodeImg().then(res => {
    codeUrl.value = "data:image/gif;base64," + res.data.img;
    loginForm.value.uuid = res.data.uuid;
  });
}

getCode();
</script>

<style scoped>
@media (min-width: 1024px) {
}
.container{
  height: 100%;
  width: 100%;
  background-image: url(@/assets/login-bg.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box{
  background: var(--el-bg-color);
  box-shadow: 0 0 9px 1px rgb(0 0 0 / 8%);
  border-radius: 10px;
  width: 360px;
  padding: 30px;
  .title{
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
  }
  .login-form{
    box-sizing: border-box;
    .login-code {
      width: 37%;
      height: 40px;
      float: right;
      margin-bottom: 6px;
      img {
        cursor: pointer;
        vertical-align: middle;
        height: 40px;
        padding-left: 5px;
      }
    }
  }
  .login-bottom-box{
    margin-top: 6px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: var(--el-text-color-regular);
    .register-box a, .forget-password-box a{
      color: var(--el-text-color-primary);
      text-decoration: none;
    }
  }
}
.login-footer{
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: var(--el-menu-text-color);
  font-family: Arial,serif;
  font-size: 12px;
  letter-spacing: 1px;
}
.language-box{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;
  .language-icon{
    font-size: 40px;
    margin-right: 5px;
  }
}

</style>
