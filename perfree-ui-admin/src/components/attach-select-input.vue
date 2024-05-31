<template>
  <div style="width: 100%">
    <el-input v-model="modelValue" :placeholder="placeholder" style="width: 100%">
      <template #append>
        <el-button :icon="FolderOpened"  type="info" @click="openSelectImage"/>
      </template>
    </el-input>

    <el-dialog v-model="open" :title="title" width="800px" draggable>
      <attach-select-panel></attach-select-panel>
      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定</el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>

import {FolderOpened, Search} from "@element-plus/icons-vue";
import AttachSelectPanel from "@/components/attach-select-panel.vue";

const modelValue = ref('')
const placeholder = ref('请选择图片')
let open = ref(false)
let title = ref('')

function openSelectImage() {
  console.log(1111)
  open.value = true
  title.value = '请选择附件'
}
</script>