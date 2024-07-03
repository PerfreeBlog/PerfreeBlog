<template>
  <div class="page">
    <form-create v-model="formData" v-model:api="fApi" :rule="rule" :option="option"></form-create>
  </div>
</template>
<script setup>

import {getCurrentThemeSettingApi} from "@/api/theme.js";
import {ElMessage} from "element-plus";
import {saveCurrentThemeSettingApi} from "@/api/option.js";

const fApi = ref({});
const formData = ref({});
const option = ref({})
const rule = ref([]);

/**
 * 获取主题设置
 */
function getCurrentThemeSetting() {
  getCurrentThemeSettingApi().then(res => {
    if (res.code === 200) {
      option.value = res.data.option;
      option.value.onSubmit = submitSetting;
      rule.value = res.data.rule;
    } else {
      ElMessage.error(res.msg);
    }
  })
}

/**
 * 提交主题设置
 * @param formData
 */
function submitSetting(formData) {
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
    console.log(res)
  })
  console.log(param)

}

getCurrentThemeSetting();
</script>