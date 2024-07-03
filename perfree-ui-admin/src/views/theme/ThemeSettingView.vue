<template>
  <div class="page">

    <form-create v-model="formData" v-model:api="fApi" :rule="rule" :option="option"></form-create>
  </div>
</template>
<script setup>
import {getThemeInfoApi} from "@/api/theme.js";

const fApi = ref({});
const formData = ref({});
const options = ref({
  //表单提交事件
  onSubmit: function (formData) {
    alert(JSON.stringify(formData))
  }
});

const option = ref({
  "form": {
    "inline": false,
    "hideRequiredAsterisk": false,
    "labelPosition": "right",
    "size": "default",
    "labelWidth": "125px"
  },
  "resetBtn": {
    "show": true,
    "innerText": "重置"
  },
  "submitBtn": {
    "show": true,
    "innerText": "提交"
  },
})
option.value.onSubmit = (data) => {
  alert(data)
}
const rule = ref([
  {
    "type": "input",
    "field": "Fgwfly5l4udcb4c",
    "title": "输入框",
    "info": "",
    "$required": false,
    "_fc_id": "id_F1vkly5l4udcb5c",
    "name": "ref_Flurly5l4udcb6c",
    "display": true,
    "hidden": false,
    "_fc_drag_tag": "input"
  },
  {
    "type": "AttachSelectInput",
    "field": "F19zly5l4vyzakc",
    "title": "附件选择输入",
    "info": "",
    "$required": false,
    "props": {
      "attachType": "img",
      "enableInput": true
    },
    "_fc_id": "id_Ftjvly5l4vyzb7c",
    "name": "ref_F2q8ly5l4vyzb8c",
    "display": true,
    "hidden": false,
    "_fc_drag_tag": "AttachSelectInput"
  },
  {
    "type": "fcEditor",
    "field": "Fke2ly5l4ykvb9c",
    "title": "富文本框",
    "info": "",
    "$required": false,
    "_fc_id": "id_Fiqlly5l4ykvbac",
    "name": "ref_F7zqly5l4ykvbbc",
    "display": true,
    "hidden": false,
    "_fc_drag_tag": "fcEditor"
  }
]);

function getThemeInfo() {
  getThemeInfoApi().then(res => {
    console.log(res)
  })
}

getThemeInfo();
</script>