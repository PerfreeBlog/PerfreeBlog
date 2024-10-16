<template>
  <div class="container">
    <div class="init-box">
      <el-form ref="initRef" :model="initForm" :rules="initRules" class="login-form">
        <h3 class="title">网站初始配置</h3>
        <el-form-item prop="webName">
          <el-input
              v-model="initForm.webName"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="网站名称"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-earth-africa"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="webTitle">
          <el-input
              v-model="initForm.webTitle"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="网站标题"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-hospital-user"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
              v-model="initForm.email"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="邮箱"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-mail-bulk"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
              v-model="initForm.username"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入管理员名称"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-regular fa-user "/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-input
              v-model="initForm.account"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入管理员账户"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-regular fa-user "/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="initForm.password"
              type="password"
              size="large"
              auto-complete="off"
              placeholder="请输入密码"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-lock "/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input
              v-model="initForm.checkPassword"
              type="password"
              size="large"
              auto-complete="off"
              placeholder="请再次输入密码"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-lock "/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item style="width:100%;margin-top: 20px">
          <el-button
              :loading="loading"
              size="large"
              type="primary"
              style="width:100%;"
              @click="handleLogin"
          >
            <span>提 交</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  底部  -->
    <div class="login-footer">
      <span>Copyright © 2018-2024  All Rights Reserved. </span>
    </div>
  </div>
</template>

<script setup>
// 验证码开关
import {useRouter} from "vue-router";
import {computed, getCurrentInstance, onMounted, ref} from "vue";
import {initWebApi} from "@/core/api/system.js";
import {ElMessage} from "element-plus";
import {changeFaviconByUrl} from "@/core/utils/perfree.js";
import {CONSTANTS} from "@/core/utils/constants.js";

const {proxy} = getCurrentInstance();
const router = useRouter();

const initForm = ref({
  webName: "",
  webTitle: "",
  email: "",
  account: "",
  username: "",
  password: "",
  checkPassword: ""
});

const initRules = computed(() => ({
  username: [{required: true, trigger: "blur", message: '请输入管理员名称'}],
  account: [{required: true, trigger: "blur", message: '请输入管理员账户'}],
  password: [{required: true, trigger: "blur", message: '请输入密码'}],
  checkPassword: [{required: true, trigger: "blur", message: '请再次输入密码'}],
  email: [{type: "email",message: "请输入正确的邮箱地址",trigger: ["blur", "change"]}],
  webTitle: [{required: true, trigger: "blur", message: '请输入网站标题'}],
  webName: [{required: true, trigger: "blur", message: '请输入网站名称'}],
}))

const loading = ref(false);

onMounted(() => {
  document.title = 'Perfree';
  changeFaviconByUrl('/assets/favicon.ico');
  localStorage.removeItem(CONSTANTS.STORAGE_TOKEN);
})
/**
 * 处理登录逻辑
 */
const handleLogin = () => {
  proxy.$refs.initRef.validate(valid => {
    if (valid) {
      if (initForm.value.checkPassword !== initForm.value.password) {
        ElMessage.error("两次输入的密码不一致!")
        return
      }
      loading.value = true;
      initWebApi(initForm.value).then(res => {
        if(res.code === 200) {
          ElMessage.success("网站初始化成功")
          router.replace("/login")
        } else {
          ElMessage.error(res.msg)
        }
        loading.value = false;
      })
    }
  })
}

</script>

<style scoped>
@media (min-width: 1024px) {
}

.container {
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

.init-box {
  background: var(--el-bg-color);
  box-shadow: 0 0 9px 1px rgb(0 0 0 / 8%);
  border-radius: 10px;
  width: 360px;
  padding: 30px;

  .title {
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }

  .login-form {
    box-sizing: border-box;
  }

}

.login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: var(--el-menu-text-color);
  font-family: Arial, serif;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
