<template>
  <div>插件demo页面示例</div>
  <br>
  <el-button>Default</el-button>
  <el-button type="primary" @click="openDialog">打开弹窗</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <br><br>
  <el-alert title="Success alert" type="success" />
  <br>
  <el-alert title="Info alert" type="info" />
  <br>
  <el-alert title="Warning alert" type="warning" />
  <br>
  <el-alert title="Error alert" type="error" />
  
  <el-dialog v-model="open" title="测试" width="600px" draggable>
    测试
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";

let open = ref(false);


function openDialog() {
  open.value = true;
}
</script>