<template>
  <div class="page">
    <h2><font-awesome-icon icon="fa-solid fa-gauge-high" /> 系统信息</h2>
    <el-divider />
    <el-descriptions  border :column="1" v-loading="loading">
      <el-descriptions-item label="系统版本">{{sysInfo.version}}</el-descriptions-item>
      <el-descriptions-item label="JDK信息">{{jvmInfo.home + ' | ' + jvmInfo.name + ' | ' + jvmInfo.version}}</el-descriptions-item>
      <el-descriptions-item label="操作系统">{{sysInfo.osName}}</el-descriptions-item>
      <el-descriptions-item label="已启用主题">
        <el-tag size="small">{{sysInfo.theme}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="已启用插件">
        <el-tag size="small" v-for="plugin in sysInfo.pluginList" class="plugin">{{plugin}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="官网地址"><el-link href="https://www.perfree.org.cn" target="_blank">https://www.perfree.org.cn</el-link></el-descriptions-item>
      <el-descriptions-item label="源码地址(github)"><el-link href="https://github.com/PerfreeBlog/PerfreeBlog" target="_blank">https://github.com/PerfreeBlog/PerfreeBlog</el-link></el-descriptions-item>
      <el-descriptions-item label="源码地址(gitee)"><el-link href="https://gitee.com/PerfreeBlog/PerfreeBlog" target="_blank">https://gitee.com/PerfreeBlog/PerfreeBlog</el-link></el-descriptions-item>
    </el-descriptions>

    <h2><font-awesome-icon icon="fa-solid fa-comments" /> 系统交流</h2>
    <el-divider />

    <div class="img-panel">
      <div class="img-box">
        <el-image :src="'/static/images/wechat_public.jpg'"
                  style="width: 100%; height: 200px"
                  :zoom-rate="1.2"
                  loading="lazy"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['/static/images/wechat_public.jpg']"
                  :initial-index="4"
                  fit="cover"/>
        <div class="img-name">公众号</div>
      </div>
      <div class="img-box">
        <el-image :src="'/static/images/QQ.jpg'"
                  style="width: 100%; height: 200px"
                  :zoom-rate="1.2"
                  loading="lazy"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['/static/images/QQ.jpg']"
                  :initial-index="4"
                  fit="cover"/>
        <div class="img-name">QQ交流群</div>
      </div>
      <div class="img-box">
        <el-image :src="'/static/images/wechat.jpg'"
                  style="width: 100%; height: 200px"
                  :zoom-rate="1.2"
                  loading="lazy"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['/static/images/wechat.jpg']"
                  :initial-index="4"
                  fit="cover"/>
        <div class="img-name">
          <div>微信交流群</div>
          <div>注：添加时备注PerfreeBlog</div>
        </div>
      </div>
    </div>

    <h2><font-awesome-icon icon="fa-solid fa-thumbs-up" /> 捐赠支持</h2>
    <el-divider />
    <div style="margin-bottom: 10px">开源不易,来包辣条支持下~</div>
    <div class="img-panel">
      <div class="img-box">
        <el-image :src="'/static/images/wechat_donate.jpg'"
                  style="width: 100%; height: 200px"
                  :zoom-rate="1.2"
                  loading="lazy"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['/static/images/wechat_donate.jpg']"
                  :initial-index="4"
                  fit="cover"/>
        <div class="img-name">微信捐赠</div>
      </div>
      <div class="img-box">
        <el-image :src="'/static/images/ali_donate.jpg'"
                  style="width: 100%; height: 200px"
                  :zoom-rate="1.2"
                  loading="lazy"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['/static/images/ali_donate.jpg']"
                  :initial-index="4"
                  fit="cover"/>
        <div class="img-name">支付宝捐赠</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {getServerInfoApi} from "@/modules/about/api/adminHome.js";

let sysInfo = ref({})
let jvmInfo = ref({})
let loading = ref(true)
function init() {
  getServerInfoApi().then(res => {
    loading.value = false
    console.log(res)
    sysInfo.value = res.data.sysInfo;
    jvmInfo.value = res.data.jvmInfo
  })
}

init();


</script>

<style scoped>
h2{
  font-size: 17px;
  font-weight: 600;
  margin: 10px 0 0;
  color: var(--el-text-color-primary)
}
.el-divider{
  margin: 10px 0;
}
.img-panel{
  display: flex;
}
.img-box{
  display: inline-block;
  width: 200px;
  margin-left: 15px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);
  border: 1px solid var(--el-border-color-extra-light);
}
.img-name{
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  height: 46px;
  font-size: 13px;
  border-top: 1px solid var(--el-border-color-extra-light);
}
.plugin{
  margin-right: 8px;
}
</style>
