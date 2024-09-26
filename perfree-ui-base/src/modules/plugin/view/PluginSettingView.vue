<template>
  <div class="page" v-loading="loading">
    <form-create v-model="formData" v-model:api="fApi" :rule="rule" :option="option"></form-create>
    <el-empty description="当前主题无设置项" v-if="notSetting" />
  </div>
</template>
<script setup>

import {ElMessage} from "element-plus";
import {getOptionByIdentificationApi, saveOptionListApi} from "../api/option.js";
import {ref} from "vue";
import {getPluginSettingApi} from "@/modules/plugin/api/plugin.js";

const fApi = ref({});
const formData = ref({});
const option = ref({})
const rule = ref([]);
const notSetting = ref(false);
const loading = ref(true);
/**
 * 获取主题设置
 */
function getCurrentPluginSetting() {
  getPluginSettingApi(router.currentRoute.value.params.id).then(res => {
    if (res.code === 200) {
      if (!res.data) {
        notSetting.value = true;
        loading.value = false;
        return;
      }
      option.value = res.data.option;
      option.value.onSubmit = submitSetting;
      rule.value = res.data.rule;
      getOptionByIdentificationApi('plugin_' + router.currentRoute.value.params.id).then(res => {
        if (res.code === 200) {
          formData.value = res.data.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
          }, {});
        } else {
          ElMessage.error(res.msg);
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
      value: formData[key],
      identification: 'plugin_' + router.currentRoute.value.params.id
    }
    param.options.push(option);
  })

  saveOptionListApi(param).then(res => {
    if (res.code === 200) {
      ElMessage.success('保存成功');
    } else {
      ElMessage.success(res.msg);
    }
    loading.value = false;
  })
}

getCurrentPluginSetting();
</script>
