<template>
  <div class="page" v-loading="loading">
    <form-create v-model="formData" v-model:api="fApi" :rule="rule" :option="option"></form-create>
    <el-empty description="当前主题无设置项" v-if="notSetting" />
  </div>
</template>
<script setup>

import {getCurrentThemeSettingApi} from "@/api/theme.js";
import {ElMessage} from "element-plus";
import {getCurrentThemeSettingValueApi, saveCurrentThemeSettingApi} from "@/api/option.js";

const fApi = ref({});
const formData = ref({});
const option = ref({})
const rule = ref([]);
const notSetting = ref(false);
const loading = ref(true);
/**
 * 获取主题设置
 */
function getCurrentThemeSetting() {
  getCurrentThemeSettingApi().then(res => {
    if (res.code === 200) {
      if (!res.data) {
        notSetting.value = true;
        loading.value = false;
        return;
      }
      option.value = res.data.option;
      option.value.onSubmit = submitSetting;
      rule.value = res.data.rule;
      getCurrentThemeSettingValueApi().then(res => {
        if (res.code === 200) {
          formData.value = res.data.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
          }, {});
        } else {
          ElMessage.success(res.msg);
        }
        loading.value = false;
      })
    } else {
      ElMessage.error(res.msg);
      loading.value = false;
    }
  })
}

/**
 * 提交主题设置
 * @param formData
 */
function submitSetting(formData) {
  loading.value = true;
  const keys = Object.keys(formData);
  let param = {
    options: []
  }
  keys.forEach( key => {
    let option = {
      key,
      value: formData[key]
    }
    param.options.push(option);
  })

  saveCurrentThemeSettingApi(param).then(res => {
    if (res.code === 200) {
      ElMessage.success('保存成功');
    } else {
      ElMessage.success(res.msg);
    }
    loading.value = false;
  })
}

getCurrentThemeSetting();
</script>