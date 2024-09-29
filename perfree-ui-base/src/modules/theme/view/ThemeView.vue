<template>
  <div class="page">
    <div style="text-align: center;margin-bottom: 10px;display: flex;justify-content: center;">
      <el-button link type="primary" @click="handleInstallTheme"> 安装新主题 </el-button>
      <span>-</span>
      <el-button link type="primary"> 主题仓库 </el-button>
      <span>-</span>
      <el-button link type="primary"> 主题开发指南 </el-button>
    </div>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="theme in themeList" :key="theme.name">
        <el-card class="box-card" :body-style="{ padding: '0' }">
          <div slot="header" class="header">
            <span>{{theme.name}}</span>
          </div>
         <div class="theme-box-body">
           <el-image
               style="width: 100%; height: 220px;"
               :src="'/api/static/themes/' + theme.name + '/' + theme.screenshots"
               :preview-src-list="['/api/static/themes/' + theme.name + '/' + theme.screenshots]">
           </el-image>
           <div class="theme-desc">
             <el-text line-clamp="1" class="theme-desc-text">
               主题作者: {{theme.author.name}}
             </el-text>
             <el-text line-clamp="1" class="theme-desc-text">
               联系邮箱: {{theme.author.email}}
             </el-text>
             <el-text line-clamp="1" class="theme-desc-text">
               作者网址: <el-link :href="theme.author.webSite" target="_blank" class="theme-desc-link">{{theme.author.webSite}}</el-link>
             </el-text>
             <el-text line-clamp="2" class="theme-desc-text">
               {{theme.description}}
             </el-text>
           </div>
         </div>
          <div class="theme-btn-box">

            <div class="theme-btn-item">
              <el-button link class="theme-button" @click="activeTheme(theme)">
                <font-awesome-icon icon="fa-solid fa-square-check" :class="{'theme-btn-icon': true, 'theme-active': theme.isActive === 1}" />
                <span v-if="theme.isActive === 0">启用</span>
                <span v-if="theme.isActive === 1">已启用</span>
              </el-button>
            </div>
            <div class="theme-btn-item" v-if="theme.isActive === 1">
              <el-button link class="theme-button" @click="toThemeSettingPage()">
                <font-awesome-icon icon="fa-solid fa-wrench" class="theme-btn-icon" /> 设置
              </el-button>
            </div>
            <div class="theme-btn-item">
              <el-button link class="theme-button" @click="toThemeEditPage(theme)">
                <font-awesome-icon icon="fa-solid fa-pencil-alt" class="theme-btn-icon" /> 编辑
              </el-button>
            </div>
            <div class="theme-btn-item" v-if="theme.isActive === 0">
              <el-button link class="theme-button" @click="unInstallTheme(theme)">
                <font-awesome-icon icon="fa-solid fa-trash-can" class="theme-btn-icon" /> 卸载
              </el-button>
            </div>
            <div class="theme-btn-item">
              <el-button link class="theme-button">
                <font-awesome-icon icon="fa-solid fa-external-link-square" class="theme-btn-icon" /> 预览
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="themeUploadOpen" :title="'安装主题'" :width="dialogWidth(600)" draggable>
      <el-upload
          class="upload-demo"
          drag
          ref="uploadRef"
          accept="application/zip"
          :on-success="themeUploadSuccess"
          :on-error="themeUploadError"
          :headers="headers"
          :action="serverBaseUrl + '/api/auth/theme/installTheme'"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽主题文件到此或<em>点击上传主题文件</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            主题文件为zip格式,若主题文件已存在,则会自动覆盖更新!
          </div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script setup>

import {allThemeApi, swatchThemeApi, unInstallThemeApi} from "../api/theme.js";
import {UploadFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {CONSTANTS} from "@/core/utils/constants.js";
import axios_config from "@/core/api/axios_config.js";
import {ref} from "vue";
import {toPage} from "@/core/utils/tabs.js";
import {dialogWidth} from "@/core/utils/perfree.js";

let themeList = ref([]);
let themeUploadOpen = ref(false);
let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
let serverBaseUrl = axios_config.baseURL;
let  headers = {
  Authorization: "Bearer " + JSON.parse(token_info).accessToken,
};
let uploadRef = ref();

/**
 * 加载主题列表
 */
function initList() {
  allThemeApi().then(res => {
    themeList.value = res.data;
  });
}

/**
 * 安装主题处理
 */
function handleInstallTheme() {
  themeUploadOpen.value = true;
}

/**
 * 主题上传成功回调
 * @param response
 * @param uploadFile
 * @param uploadFiles
 */
function themeUploadSuccess(response, uploadFile, uploadFiles) {
  if (response.code === 200) {
    ElMessage.success('主题安装成功');
    themeUploadOpen.value = false;
    uploadRef.value.clearFiles();
    initList();
  }else {
    ElMessage.error(response.msg);
    uploadRef.value.handleRemove(uploadFile);
  }
}

/**
 * 主题上传失败回调
 * @param error
 */
function themeUploadError(error) {
  ElMessage.error('主题上传失败,请检查网络是否通通畅');
}

/**
 * 启用主题
 * @param theme
 */
function activeTheme(theme) {
  if (theme.isActive === 1) {
    return;
  }
  swatchThemeApi(theme.name).then(res => {
    if (res.code === 200) {
      ElMessage.success('主题启用成功');
      initList();
    } else {
      ElMessage.error(res.msg);
    }
  })
}

/**
 * 卸载主题
 * @param theme
 */
function unInstallTheme(theme) {
  unInstallThemeApi(theme.name).then(res => {
    if (res.code === 200) {
      ElMessage.success('主题卸载成功');
      initList();
    } else {
      ElMessage.error(res.msg);
    }
  })
}

function toThemeSettingPage() {
  toPage('', '/admin/themeSetting', null)
}

function toThemeEditPage(theme) {
  toPage(`主题编辑-[${theme.name}]`, '/admin/theme/edit/' + theme.name, '')
}
initList();
</script>

<style scoped>
.header{
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  line-height: 50px;
}
.box-card {
  width: 100%;
  margin-bottom: 15px;
  color: var(--el-text-color-regular);
}
.theme-btn-box{
  display: flex;
  height: 40px;
  line-height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.theme-box-body{
  position: relative;
  overflow: hidden;
}
.theme-desc{
  position: absolute;
  bottom: -100%;
  background: var(--el-overlay-color);
  width: 100%;
  padding: 5px;
  background: linear-gradient(rgb(0 0 0 / 33%), #414141a8);
  transition: all .3s;
}
.theme-box-body:hover .theme-desc{
    bottom: 0;
}
.theme-desc-text{
  width: 100%;
  color: var(--el-fill-color-light);
}

.theme-btn-item{
  flex: 1;
  text-align: center;
  border-right: 1px solid #e8e8e8;
}
.theme-btn-box > .theme-btn-item:last-child{
  border: none;
}
.theme-btn-icon{
  margin-right: 5px;
}
.theme-active{
  color: var(--el-color-primary);
}
.theme-desc-link{
  color: var(--el-fill-color-light);
}
.upload-theme{
  display: flex;
}
</style>
