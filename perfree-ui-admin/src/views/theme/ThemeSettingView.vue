<template>
  <div class="page">

    <WujieVue
        width="100%"
        height="100%"
        name="xxx"
        :url="'http://127.0.0.1:8080/console/theme/setting'"
    ></WujieVue>
  </div>
</template>
<script setup>
import WujieVue from "wujie-vue3";
import {ElMessage} from "element-plus";
import {getThemeInfoApi} from "@/api/theme.js";
const { bus } = WujieVue;

bus.$on("test", function () {
  ElMessage.success('收到子应用消息');
});


function getThemeInfo() {
  getThemeInfoApi().then(res => {
    console.log(res)
  })
}

getThemeInfo();
</script>