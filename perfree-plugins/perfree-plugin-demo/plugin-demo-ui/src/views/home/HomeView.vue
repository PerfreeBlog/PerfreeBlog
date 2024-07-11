<template>
  <div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning" @click="openDialog">弹出dialog</el-button>
    <el-button type="danger" @click="openMessage">弹出一个信息</el-button>
    <el-button type="primary" @click="handleToRouter">跳转至主系统路由</el-button>

    <el-dialog v-model="open" title="测试" width="600px" draggable>
      测试测试
      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary">确 定</el-button>
              <el-button @click="open = false;">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {ElMessage} from "element-plus";


let open = ref(false);

/**
 * 跳转路由
 */
function handleToRouter () {
  const baseRouter = window.microApp.router.getBaseAppRouter()
  baseRouter.replace('/admin/plugin');
}

/**
 * 弹出一个信息
 */
function openMessage() {
  ElMessage.success('修改成功');
}

/**
 * 打开Dialog
 */
function openDialog() {
  open.value = true;
}
</script>