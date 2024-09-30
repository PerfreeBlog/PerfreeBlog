<template>
  <div class="container">
    <div class="login-box">
      <el-form ref="findPasswordRef" :model="findPasswordForm" :rules="findPasswordRules" class="login-form">
        <h3 class="title">找回密码</h3>

        <el-form-item prop="account" v-if="finPassStep === 1">
          <el-input
              v-model="findPasswordForm.account"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入要找回密码的账户"
              autocomplete="off"
              readonly onfocus="this.removeAttribute('readonly');"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-user "/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="email" v-if="finPassStep === 1">
          <el-input
              v-model="findPasswordForm.email"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入邮箱地址"
              autocomplete="off"
              readonly onfocus="this.removeAttribute('readonly');"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-mail-bulk"/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="findPasswordCode" v-if="finPassStep === 2">
          <el-input
              v-model="findPasswordForm.findPasswordCode"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入邮箱验证码"
              autocomplete="off"
              readonly onfocus="this.removeAttribute('readonly');"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-user "/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="newPassword" v-if="finPassStep === 2">
          <el-input
              v-model="findPasswordForm.newPassword"
              type="password"
              size="large"
              auto-complete="off"
              placeholder="请输入新密码"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-lock "/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
              v-model="findPasswordForm.code"
              auto-complete="off"
              placeholder="请输入验证码"
              size="large"
              style="width: 63%"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-fax  "/>
            </template>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" alt=""/>
          </div>
        </el-form-item>

        <el-form-item style="width:100%;margin-top: 20px">
          <el-button
              :loading="loading"
              size="large"
              type="primary"
              style="width:100%;"
              @click.prevent="handleRegister"
          >
            <span v-if="finPassStep === 1">下一步</span>
            <span v-if="finPassStep === 2">提  交</span>
          </el-button>

          <div class="login-bottom-box">
            <div class="register-box">
              <router-link class="link-type" :to="'/login'">返回登录</router-link>
            </div>
          </div>
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
import {findPasswordStep1Api, findPasswordStep2Api, getCodeImg} from "@/core/api/system.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

const router = useRouter();

const findPasswordRef = ref();
let finPassStep = ref(1);

const findPasswordForm = ref({
  account: "",
  newPassword: "",
  email: "",
  findPasswordCode: "",
  code: "",
  uuid: ""
});

const findPasswordRules = computed(() => ({
  userName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称必须在2-20字之间', trigger: 'blur' }
  ],
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 5, max: 16, message: '账户必须在5-16字之间', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 5, max: 16, message: '新密码必须在5-16字之间', trigger: 'blur' }
  ],
  findPasswordCode: [{required: true, trigger: "blur", message: '邮箱验证码不能为空'}],
  code: [{required: true, trigger: "blur", message: '验证码不能为空'}],
  email: [{type: "email",message: "请输入正确的邮箱地址",trigger: ["blur", "change"]}],
}))

let codeUrl = ref("");
const loading = ref(false);

/**
 * 处理登录逻辑
 */
const handleRegister = () => {
  loading.value = true;
  findPasswordRef.value.validate(valid => {
    if (valid) {
      if (finPassStep.value === 1) {
        findPasswordStep1Api(findPasswordForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('验证码已发送,请前往邮箱查看');
            findPasswordForm.value.code = "";
            getCode();
            finPassStep.value = 2;
            loading.value = false;
          } else {
            ElMessage.error(res.msg);
            findPasswordForm.value.code = "";
            loading.value = false;
            getCode();
          }
        }).catch(() => {
          loading.value = false;
        });
      } else {
        findPasswordStep2Api(findPasswordForm.value).then((res) => {
          if (res.code === 200) {
            loading.value = false;
            ElMessageBox.confirm('密码重置成功,前往登录~', '提示', {
              confirmButtonText: '确认',
              showCancelButton: false,
              type: 'success',
            }).then(() => {
              router.replace("/login");
            }).catch(() => {
            })
          } else {
            ElMessage.error(res.msg);
            findPasswordForm.value.code = "";
            loading.value = false;
            getCode();
          }
        }).catch(() => {
          loading.value = false;
        });
      }
    } else {
      loading.value = false;
    }
  })
}

/**
 * 获取验证码
 */
const getCode = () => {
  getCodeImg().then(res => {
    codeUrl.value = "data:image/gif;base64," + res.data.img;
    findPasswordForm.value.uuid = res.data.uuid;
  });
}

getCode();
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

.login-box {
  background: var(--el-bg-color);
  box-shadow: 0 0 9px 1px rgb(0 0 0 / 8%);
  border-radius: 10px;
  width: 360px;
  padding: 30px;

  .title {
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
  }

  .login-form {
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

  .login-bottom-box {
    margin-top: 6px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: var(--el-text-color-regular);

    .forget-password-box{
      margin-left: auto;
    }
    .register-box a, .forget-password-box a {
      color: var(--el-text-color-primary);
      text-decoration: none;
    }
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

.language-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;

  .language-icon {
    font-size: 40px;
    margin-right: 5px;
  }
}

</style>
